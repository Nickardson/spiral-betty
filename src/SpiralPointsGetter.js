import React from 'react'
import { getPoints } from './lib/spiral'

class SpiralPointsGetter extends React.Component {
  _mouseDown = () => {
    this.mouseIsDown = true
  }
  _mouseUp = () => {
    this.mouseIsDown = false
    this.forceUpdate()
  }
  componentDidMount () {
    if (this.props.delayUntilMouseUp) {
      window.addEventListener('mousedown', this._mouseDown)
      window.addEventListener('mouseup', this._mouseUp)
    }
  }
  shouldComponentUpdate () {
    if (this.props.delayUntilMouseUp && this.mouseIsDown) {
      return false
    } else {
      return true
    }
  }
  componentWillUnmount () {
    if (this.props.delayUntilMouseUp) {
      window.removeEventListener('mousedown', this._mouseDown)
      window.removeEventListener('mouseup', this._mouseUp)
    }
  }
  render() {
    const {width, height, scale, contrast, lightness, cx, cy, data: imgData, filter: {data: {rings: maxLoops}}} = this.props
    const points = getPoints({
      contrast,
      lightness,
      cx,
      cy,
      invert: false,
      scale,
      width,
      height,
      imgData,
      maxLoops
    })
    return this.props.children({points, width, height, scale})
  }
}

export default SpiralPointsGetter
