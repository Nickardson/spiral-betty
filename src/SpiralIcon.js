import React from 'react'
import { connect } from 'react-redux'
import SpiralCircle from './SpiralCircle'
import SpiralLine from './SpiralLine'
const { maskIdThumb } = require('./lib/constants')

const SpiralIcon = ({
  index,
  dark,
  light,
  imgData,
  width,
  scale,
  height,
  fill
}) => {
  const svgLength = Math.min(width / scale, height / scale)
  const viewBox = `0 0 ${svgLength} ${svgLength}`
  const radius = svgLength / 2
  return (
    <svg viewBox={viewBox}>
      <SpiralCircle
        radius={radius}
        colorData={fill.background === 'dark' ? dark : light}
        defPrefix={`s-${index}-`} />
      <SpiralLine
        defPrefix={`s-${index}-`}
        maskId={maskIdThumb}
        colorData={fill.line === 'dark' ? dark : light}
        />
    </svg>
  )
}

const mapStateToProps = (state) => {
  const {img: {scale, width, height}} = state
  return {
    scale,
    width,
    height
  }
}

export default connect(
  mapStateToProps
)(SpiralIcon)