import {contrastVal} from './img'

const getAngle = (loop, chord, b) => (
  chord / ((loop * b + (loop + 1) * b) / 2)
)

const getDarknessOfPoint = ({x, y, width, imgData, contrast}) => {
  // TODO: Include alpha
  var i = y * (width * 4) + x * 4
  
  const r = contrastVal(imgData[i], contrast)
  const g = contrastVal(imgData[i + 1], contrast)
  const b = contrastVal(imgData[i + 2], contrast)
  
  const gray = (0.3 * r) + (0.59 * g) + (0.11 * b)
  const average = 1 - gray / 256
  return {average}
}

const getX = ({x, r, angle}) => ( Math.round((x + r * Math.cos(angle)) * 10) / 10 )
const getY = ({y, r, angle}) => ( Math.round((y - r * Math.sin(angle)) * 10) / 10 )

const getOutterAndInnerPoints = ({x, y, r, angle}) => {
  const p1 = [getX({x, r, angle}), getY({y, r, angle})]
  const angle2 = angle + Math.PI
  const p2 = [getX({x, r, angle: angle2}), getY({y, r, angle: angle2})]
  return {p1, p2}
}

const unitCircle = [ // gets first ring's values then we can use the chord value
  Math.PI / 6,
  Math.PI / 4,
  Math.PI / 3,
  Math.PI / 2,
  2 / 3 * Math.PI,
  3 / 4 * Math.PI,
  5 / 6 * Math.PI,
  Math.PI,
  7 / 6 * Math.PI,
  5 / 4 * Math.PI,
  4 / 3 * Math.PI,
  3 / 2 * Math.PI,
  5 / 3 * Math.PI,
  7 / 4 * Math.PI,
  11 / 6 * Math.PI,
  2 * Math.PI,
]

const getPoints = ({imgData, contrast, scale, cx, cy, width, height, maxLoops = 50}) => {
  const scaledWidth = width / scale
  const scaledHeight = height / scale
  const outter = []
  const inner = []
  
  const radius = Math.min(scaledWidth, scaledHeight) / 2
    
  let loop = 0
  const deltaRadius = radius / (maxLoops + 1)
  const b = deltaRadius / 2 / Math.PI
  const maxAngle = maxLoops * 2 * Math.PI - (Math.PI * 7 / 10)
  const chord = .619

  // Line thickness
  const maxThickness = deltaRadius * .45
  const minThickness = maxThickness / 6
  
  let angle = 0
  let firstRing = [...unitCircle]
  while (angle < maxAngle) {
    const x = (b * angle) * Math.cos(angle)
    const y = (b * angle) * Math.sin(angle)
    const pX = cx + x // image/photo x
    const pY = cy - y // image/photo y
    
    // Make sure within our circle
    // TODO: possibly get two points on either side of center pt
    if (pX <= width && pX >= 0 && pY <= height && pY >= 0) {
      const {average: value} = getDarknessOfPoint({
        x: Math.round(pX),
        y: Math.round(pY),
        width,
        imgData,
        contrast
      })
      const thickness = Math.max(value * maxThickness, minThickness)
      
      // get two points 
      const {p1, p2} = getOutterAndInnerPoints({
        x: radius + x,
        y: radius - y,
        r: thickness,
        angle
      })
      
      outter.push(p1)
      inner.push(p2)
    }
    
    loop = Math.floor(angle / Math.PI * 2) // which loop are we on...
    if (firstRing.length) angle = firstRing.shift()
    else angle = angle + getAngle(loop, chord, b)
  }
  
  return {outter, inner}
}

const createPath = ({outter, inner}) => {
  let d = 'M'
  outter.forEach(([x, y]) => { d += `${x},${y} `})
  inner.reverse().forEach(([x, y]) => { d += `${x},${y} ` })
  d += 'Z'
  return d
}


export {getPoints, createPath}