import React from 'react'
import {coloring} from './lib/constants'
import styled, {keyframes, css} from 'styled-components'
import WorkspaceIconAndText from './WorkspaceIconAndText'
const {easing} = require('./lib/constants')


const getLoopStartLengthAndOffset = ({offsetFactor, i, loopIndexes, loopsLength, sideLength, onlyOffset = false}) => { 
  // Regular start without offset yet (basically at deg 0)
  let start = loopIndexes[i] 
  
  // Loop if we went all the way around
  let length = i < loopsLength - 1
    ? loopIndexes[i + 1] - start + 1 // not last loop: get length (next start - this start, and add 1 to link loops)
    : sideLength - start // last loop: full length of points - this start

  // Apply offsets to the start/length
  const percentStart = (i % offsetFactor) / offsetFactor
  const offset = Math.floor(percentStart * length)
  
  if (onlyOffset) return {offset}
  
  start = start + offset // new start
  length = length - offset // new length
  
  return {start, length}
}
const getLoopsInfo = (points) => {
  const {loopIndexes, outter} = points
  const sideLength = outter.length
  const loopsLength = loopIndexes.length
  const loopsInfo = []
  const offsetFactor = 8 // segments where animation starts divide up 360 by this
  // Loop through loops :)
  for (let i = 0; i < loopsLength; i++) { 
    // Where to start each loop
    let {start, length} = getLoopStartLengthAndOffset({
      offsetFactor,
      i,
      loopIndexes,
      loopsLength,
      sideLength
    })

    // If next loop has an offset... we'll want to add that to our length
    let nextOffset = 0
    if (i !== (loopsLength - 1)) { // don't do this for last loop
      ({offset: nextOffset} = getLoopStartLengthAndOffset({
        offsetFactor,
        i: i + 1,
        loopIndexes,
        loopsLength,
        sideLength,
        onlyOffset: true
      }))
    }

    loopsInfo.push({
      length: length + nextOffset,
      start
    })      
  }
  return loopsInfo
}

const bounceIn = keyframes`
  0% {
    transform: scale(1) translateZ(0);
  }
  70% {
    transform: scale(1.26) translateZ(0);
  }
  100% {
    transform: scale(1.25) translateZ(0);
  }
`
const bounceOut = keyframes`
  0% {
    transform: scale(1.25) translateZ(0);
  }
  70% {
    transform: scale(.985) translateZ(0);
  }
  100% {
    transform: scale(1) translateZ(0);
  }
`

const Canvas = styled.canvas`
  transition: border .2s;
  cursor: pointer;
  border-radius: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateZ(0);
  ${props => props.highlight ? css`
      border: 0px solid rgba(255,255,255,0);
      box-shadow: 0 0 0 0px rgba(255,255,255,0);
      animation: ${bounceOut} both .15s;
      &:hover {
        border: 3px solid ${props.accent};
      }
      @media not all and (hover: none) {
        &:hover {
          animation: ${bounceIn} both .25s;
          box-shadow: 0 0 0 4px ${props.highlight};
          border: 3px solid ${props.accent};
          z-index: 1000000; // absurd number on purpose
        }
    ` : ''
  }
  ${props => props.active ? `
    border: 3px solid ${props.accent};
  ` : ''}
  ${props => props.interactive ? '' : `
    &:active {
      border: 3px solid ${props.accent};
      box-shadow: 0 0 0 4px ${props.highlight};
    }
  `}
`

const Overlay = styled.div`
  opacity: 0;
  transition: .2s;
  border: 3px solid var(--accent);
  border-radius: 100%;
  line-height: 0;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,.3);
  :hover {
    opacity: 1;
  }
`

const getFillType = (ctx, {colors, fill, fill: {attr}}, len) => {
  let x1, y1, r1, x2, y2, r2, grad
  switch (fill.type) {
    case 'radial-gradient':
      ({x1, y1, r1, x2, y2, r2} = attr)
      grad = ctx.createRadialGradient(x1 * len, y1 * len, r1 * len, x2 * len, y2 * len, r2 * len)
      colors.forEach(({color, offset}) => {
        grad.addColorStop(offset, color)
      })
      
      // Fill with gradient
      ctx.fillStyle = grad
      return
    case 'linear-gradient':
      ({x1, x2, y1, y2} = attr)
      grad = ctx.createLinearGradient(x1 * len, y1 * len, x2 * len, y2 * len)
      colors.forEach(({color, offset}) => {
        grad.addColorStop(offset, color)
      })
      
      // Fill with gradient
      ctx.fillStyle = grad
      return
    case 'flood':
    default:
      ctx.fillStyle = colors[0].color
      return
  }
}

const addStroke = (ctx, strokeColorData, type) => {
  if (strokeColorData !== undefined) {
    switch (type) {
      case 'print':
        ctx.lineWidth = 2
        break
      case 'preview':
        ctx.lineWidth = 1
        break
      case 'swatch':
      default:
        ctx.lineWidth = .2
        break
    }
    ctx.strokeStyle = strokeColorData.colors[0].color
    ctx.stroke()
  }
}

class SpiralCanvas extends React.PureComponent {
  // Pixel density (multiplier)
  // - Do not need extra pixels for downloads
  multiplier =  this.props.enableRetina ? window.devicePixelRatio || 1 : 1 

  animate = (loopsInfo, count, onComplete) => {
    if (count <= 100) {
      // Only animate to count 100
      this.updateCanvas(loopsInfo, count)
      requestAnimationFrame(() => { this.animate(loopsInfo, count + 2, onComplete)})
    } else {
      onComplete()
    }
  }
  componentDidMount () {
    const {animate, points, editing, onEndAnimation: onComplete, onStartAnimation} = this.props
    if (animate) {
      if (!editing) {
        const loopsInfo = getLoopsInfo(points)
        // Start the animation
        requestAnimationFrame(() => { this.animate(loopsInfo, 0, onComplete)})
        onStartAnimation()
      }
    } else {
      this.updateCanvas()
    }    
  }
  componentDidUpdate(prevProps) {
    const {animate, points, editing, onEndAnimation: onComplete, onStartAnimation} = this.props
    if (animate) {
      if (!editing && prevProps.editing) {
        const loopsInfo = getLoopsInfo(points)
        // Start the animation
        requestAnimationFrame(() => { this.animate(loopsInfo, 0, onComplete)})
        onStartAnimation()
      } else {
        this.updateCanvas()
      }
    } else {
      this.updateCanvas()
    }   
  }
  updateCanvas = (loopsInfo, count) => {
    if (!this.canvas) return
    const {width, scale: s, height, colorIndex, length, points, type} = this.props
    const imgLength = Math.min(width / s, height / s)
    const {inner, outter} = points || {}
    const ctx = this.canvas.getContext('2d') // future optimization {alpha: false} not fully supported right now especially in mobile
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, length, length)
    ctx.scale(this.multiplier, this.multiplier)

    const scale = length / imgLength
    const colorData = coloring[colorIndex]
    const {fill: {line, background, stroke}} = colorData
    const bgColorData = colorData[background]
    const lineColorData = colorData[line]
    const strokeColorData = colorData[stroke]
    
    // Background especially for downloading
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, length, length)

    if (inner && inner.length) { 
      // Circle
      getFillType(ctx, bgColorData, length)
      ctx.arc(length / 2, length / 2, length / 2, 0, 2 * Math.PI)
      ctx.fill()

      // Lines
      getFillType(ctx, lineColorData, length)
      if (loopsInfo && count !== 100) { // Don't want to animate last loop because of strokes
        loopsInfo.forEach(({start, length}) => {
          const index = start + (easing.easeInOut(count / 100) * length)
          const outterLoop = outter.slice(start, index)
          const innerLoop = inner.slice(start, index)
          ctx.beginPath()
          for (let i = 0, len = innerLoop.length; i < len; i++) {
            const [x, y] = innerLoop[i]
            if (i === 0) {
              ctx.moveTo(x * scale, y * scale)
            } else {
              ctx.lineTo(x * scale, y * scale)
            }
          }
          for (let i = 0, len = outterLoop.length; i < len; i++) {
            const [x, y] = outterLoop[(len - 1) - i]
            ctx.lineTo(x * scale, y * scale)
          }
          ctx.fill()
          addStroke(ctx, strokeColorData, type)
        })
      } 
      if (count === 100 || !loopsInfo) {
        ctx.beginPath()
        for (let i = 0, len = inner.length; i < len; i++) {
          const [x, y] = inner[i]
          if (i === 0) {
            ctx.moveTo(x * scale, y * scale)
          } else {
            ctx.lineTo(x * scale, y * scale)
          }
        }
        for (let i = 0, len = outter.length; i < len; i++) {
          const [x, y] = outter[(len - 1) - i]
          ctx.lineTo(x * scale, y * scale)
        }
        ctx.closePath()
        ctx.fill()
        addStroke(ctx, strokeColorData, type)
      }
    }
  }
  render () {
    const { length, setEditingPhoto, interactive, id, highlight, accent, active } = this.props
    return (
      [<Canvas
        key="canvas"
        highlight={highlight}
        accent={accent}
        active={active}
        interactive={interactive}
        id={id}
        ref={(x) => this.canvas = x}
        width={length * this.multiplier}
        height={length * this.multiplier} />,
        (interactive && <Overlay
          onClick={interactive && setEditingPhoto ? () => { setEditingPhoto(true) } : undefined}
          key="overlay">
          <WorkspaceIconAndText
            active
            text={`Click to crop`}
            type="move" />
        </Overlay>)
      ]
    )
  }
}

export default SpiralCanvas