import React, { Component } from 'react'
import {coloring} from './lib/constants'
import {startEditingPhoto} from './redux/actions'
import { connect } from 'react-redux'

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
      break
    case 'linear-gradient':
      ({x1, x2, y1, y2} = attr)
      grad = ctx.createLinearGradient(x1 * len, y1 * len, x2 * len, y2 * len)
      colors.forEach(({color, offset}) => {
        grad.addColorStop(offset, color)
      })
      
      // Fill with gradient
      ctx.fillStyle = grad
      break
    case 'flood':
    default:
      ctx.fillStyle = colors[0].color
  }
}

class SpiralCanvas extends Component {
  multiplier =  1 //window.devicePixelRatio || 1
  componentDidMount () {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  updateCanvas = () => {
    if (!this.refs.canvas) return

    const {width, scale: s, height, colorIndex, length: canvasLength, points} = this.props
    const imgLength = Math.min(width / s, height / s)
    const {inner, outter} = points || {}
    const ctx = this.refs.canvas.getContext('2d')
    ctx.scale(this.multiplier, this.multiplier)
    ctx.clearRect(0, 0, canvasLength, canvasLength)

    const scale = canvasLength / imgLength
    const colorData = coloring[colorIndex]
    const {fill: {line, background}} = colorData
    const bgColorData = colorData[background]
    const lineColorData = colorData[line]
    
    // Background especially for downloading
    ctx.fillStyle = '#fff'
    ctx.fillRect(0,0,canvasLength,canvasLength)

    if (inner && inner.length) { 
      // Circle     
      ctx.beginPath()
      getFillType(ctx, bgColorData, canvasLength)
      ctx.arc(canvasLength / 2, canvasLength / 2, canvasLength / 2, 0, 2 * Math.PI)
      ctx.fill()

      // Line
      ctx.beginPath()
      getFillType(ctx, lineColorData, canvasLength)
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
    }
    
  }
  render () {
    const { length, startEditingPhoto, id } = this.props
    return (
      <canvas
        id={id}
        onClick={id && startEditingPhoto}
        ref="canvas"
        width={length * this.multiplier}
        height={length * this.multiplier}
        style={{
          width: length,
          height: length,
          position: 'absolute',
          left: 0,
          top: 0,
        }} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startEditingPhoto: () => dispatch(startEditingPhoto())
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(SpiralCanvas)