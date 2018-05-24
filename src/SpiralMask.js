import React, { PureComponent } from 'react'
import {getPoints, createPath} from './lib/spiral'
import { connect } from 'react-redux'

const {maskId} = require('./lib/constants')

// TODO: move functions into own file
class SpiralMask extends PureComponent {
  getPointsFromProps ({cx, cy, contrast, lightness, scale, width, height, imgData, rings}) {
    return getPoints({
      contrast,
      lightness,
      cx,
      cy,
      scale,
      width,
      height,
      imgData,
      maxLoops: rings
    })
  }
  render () {
    const { imgData, width, scale, height } = this.props
    if (!imgData) return null
    const points = this.getPointsFromProps(this.props)
    const d = createPath(points)
    const svgLength = Math.min(width / scale, height / scale)
    const viewBox = `0 0 ${svgLength} ${svgLength}`
    return (
      <svg viewBox={viewBox}>
        <defs>
          <mask
            fill='#fff'
            id={maskId}>
              <path d={d} />
          </mask>
        </defs>
      </svg>
    )
  }
}

const mapStateToProps = (state) => {
  const {filter: {data: {rings}}, img: {cx, cy, contrast, lightness, scale, data: imgData, width, height}} = state
  return {
    imgData,
    width,
    height,
    scale,
    rings,
    cx,
    cy,
    contrast,
    lightness
  }
}

export default connect(
  mapStateToProps
)(SpiralMask)