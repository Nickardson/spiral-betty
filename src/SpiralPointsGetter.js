import { Component } from 'react'
import { getPoints } from './lib/spiral'
import { connect } from 'react-redux'

class SpiralPointsGetter extends Component {
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
    const {width, height, scale, contrast, lightness, cx, cy, imgData, filter: {data: {rings}}} = this.props
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
      maxLoops: rings
    })
    return this.props.children({points, width, height, scale})
  }
}

const mapStateToProps = (state) => {
  const {
    img: { cx, cy, contrast, lightness, scale, data: imgData, width, height }
  } = state
  return {
    cx,
    cy,
    contrast,
    scale,
    imgData,
    width,
    height,
    lightness
  }
}

export default connect(mapStateToProps)(SpiralPointsGetter)
