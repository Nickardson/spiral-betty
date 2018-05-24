import React from 'react'
import { connect } from 'react-redux'

const SpiralIcon = ({imgData, width, scale, height, fill, cx, cy, contrast, lightness, rings}) => {
  if (!imgData) return null
  const svgLength = Math.min(width / scale, height / scale)
  const viewBox = `0 0 ${svgLength} ${svgLength}`
  return (
    <svg viewBox={viewBox}>
      <rect
        //key={`${scale}-${cx}-${cy}-${contrast}-${lightness}-${rings}`} // force repaints for stupid Safari
        fill={fill}
        mask='url(#mask)'
        width='100%'
        height='100%' />
    </svg>
  )
}

const mapStateToProps = (state) => {
  const {filter: {data: {rings}}, img: {scale, data: imgData, cx, cy, contrast, lightness, width, height}} = state
  return {
    scale,
    imgData,
    width,
    height,
    lightness,
    contrast,
    cx,
    cy,
    rings
  }
}

export default connect(
  mapStateToProps
)(SpiralIcon)