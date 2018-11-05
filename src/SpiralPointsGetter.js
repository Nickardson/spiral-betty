import React from 'react'
import { getPoints } from './lib/spiral'

class SpiralPointsGetter extends React.Component {
  shouldComponentUpdate (nextProps) {
    // Don't allow swatches to update... just master img
    if (nextProps.colorIndex !== this.props.colorIndex) return false
    return true
  }
  render() {
    const {width, height, scale, contrast, lightness, cx, cy, data: imgData, rings: maxLoops} = this.props
    const points = getPoints({
      contrast,
      lightness,
      cx,
      cy,
      scale,
      width,
      height,
      imgData,
      maxLoops
    })
    return this.props.children({
      points,
      width,
      height,
      scale
    })
  }
}

export default SpiralPointsGetter
