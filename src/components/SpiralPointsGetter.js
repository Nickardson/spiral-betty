import React from 'react'
import { getPoints } from '../lib/spiral'

class SpiralPointsGetter extends React.Component {
  calculated = {} 
  shouldComponentUpdate (nextProps) {
    // Don't allow swatches to update... just master img
    if (nextProps.colorIndex !== this.props.colorIndex) return false
    return true
  }
  
  getKey = ({contrast, lightness, cx, cy, scale, width, height, name, maxLoops, date}) => {
    return `${contrast}-${lightness}-${cx}-${cy}-${scale}-${width}-${height}-${name}-${maxLoops}-${date}`
  }
  render() {
    const {width, height, scale, contrast, lightness, cx, cy, data: imgData, rings: maxLoops, name, date} = this.props
    const key = this.getKey({contrast,
      lightness,
      cx,
      cy,
      scale,
      width,
      height,
      name,
      date,
      maxLoops
    })
    let points
    if (this.calculated[key]) {
      points = this.calculated[key]
    } else {
      points = getPoints({
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
      this.calculated[key] = points
    }
    return this.props.children({
      points,
      width,
      height,
      scale
    })
  }
}

export default SpiralPointsGetter
