import {contrastColor, keepChannelInRange, valueColor} from './img'

const getAngle = (loop, chord, b) => (
  chord / ((loop * b + (loop + 1) * b) / 2)
)

const getValueOfPoint = ({x, y, width, imgData, contrast, invert, lightness}) => {
  var i = y * (width * 4) + x * 4
  
  // init values
  let r = imgData[i]
  let g = imgData[i + 1]
  let b = imgData[i + 2]
  const a = imgData[i + 3]
    
  // Lightness
  r = valueColor(r, lightness)
  g = valueColor(g, lightness)
  b = valueColor(b, lightness)
  
  // Contrast
  r = contrastColor(r, contrast)
  g = contrastColor(g, contrast)
  b = contrastColor(b, contrast)
  
  // Keep in range
  r = keepChannelInRange(r)
  g = keepChannelInRange(g)
  b = keepChannelInRange(b)
  
  const weighted = (0.3 * r) + (0.59 * g) + (0.11 * b)
  const value = invert ? 1 - ((1 - weighted / 256) * (a / 255)) : (1 - weighted / 256) * (a / 255)
  return value
}

const getX = ({x, r, angle}) => ( Math.round((x + r * Math.cos(angle)) * 10) / 10 )
const getY = ({y, r, angle}) => ( Math.round((y - r * Math.sin(angle)) * 10) / 10 )

const getOutterAndInnerPoints = ({x, y, rOutter, rInner, angle}) => {
  const p1 = [getX({x, r: rOutter, angle}), getY({y, r: rOutter, angle})]
  const angle2 = angle + Math.PI
  const p2 = [getX({x, r: rInner, angle: angle2}), getY({y, r: rInner, angle: angle2})]
  return {p1, p2}
}

// const makeUnitCircle = (divisions) => { // gets first ring's values then we can use the chord value
//   return Array.from(Array(divisions).keys()).map((i) => {
//     return ((i + 1) / (divisions - 1)) * 2 * Math.PI
//   })
// }

const getPoints = ({imgData, lightness, contrast, invert = false, scale, cx, cy, width, height, maxLoops = 50}) => {
  const scaledWidth = width / scale
  const scaledHeight = height / scale
  const outter = []
  const inner = []
  const thickness = []
  const loopIndexes = [] // used for animations
  const minPointsOnCircle = 30
  
  const radius = Math.min(scaledWidth, scaledHeight) / 2
    
  let loop = 0
  const deltaRadius = radius / (maxLoops + 1)
  const b = deltaRadius / 2 / Math.PI
  const maxAngle = maxLoops * 2 * Math.PI - (Math.PI * 7 / 10)
  const chord = .619

  // Line thickness
  const maxThickness = deltaRadius * .42
  const minThickness = maxThickness / 6
  const sampleDist = maxThickness * .25
  
  let angle = Math.PI / 12
  let firstRing = [] //[...makeUnitCircle(minPointsOnCircle)]
  while (angle < maxAngle) {
    // console.log(angle)
    const x = (b * angle) * Math.cos(angle)
    const y = (b * angle) * Math.sin(angle)
    const pX = cx + x // image/photo x
    const pY = cy - y // image/photo y
    
    // Make sure within our circle
    // TODO: possibly get two points on either side of center pt
    // TODO: make sure sample points are in as well
    if (pX <= width && pX >= 0 && pY <= height && pY >= 0) {
      // get darkness of points .25 away from point...
      const outterPoint = {
        x: Math.round(pX + sampleDist * Math.cos(angle)),
        y: Math.round(pY + sampleDist * Math.sin(angle))
      }
      const innerPoint = {
        x: Math.round(pX + sampleDist * Math.cos(angle + Math.PI)),
        y: Math.round(pY + sampleDist * Math.sin(angle + Math.PI))
      }
      const valueOutter = getValueOfPoint({
        ...outterPoint,
        width,
        imgData,
        contrast,
        invert,
        lightness: lightness / 100
      })
      const valueInner = getValueOfPoint({
        ...innerPoint,
        width,
        imgData,
        contrast,
        invert,
        lightness: lightness / 100
      })
      const thicknessOutter = Math.max(valueOutter * maxThickness, minThickness)
      const thicknessInner = Math.max(valueInner * maxThickness, minThickness)
      
      // get two points 
      const {p1, p2} = getOutterAndInnerPoints({
        x: radius + x,
        y: radius - y,
        rOutter: thicknessOutter,
        rInner: thicknessInner,
        angle
      })
      
      outter.push(p1)
      inner.push(p2)
      thickness.push([
        1 * x.toFixed(1),
        1 * y.toFixed(1),
        1 * thicknessInner.toFixed(2)
      ]);
    }
    
    loop = Math.floor(angle / (Math.PI * 2)) // which loop are we on...
    if (loopIndexes[loop] === undefined) loopIndexes.push(outter.length - 1)
    if (firstRing.length) angle = firstRing.shift()
    else angle = angle + Math.min(getAngle(loop, chord, b), Math.PI * 2 / minPointsOnCircle)
  }
  
  return {outter, inner, loopIndexes, thickness}
}

export {getPoints}