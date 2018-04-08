import React, { PureComponent } from 'react'
import {getPoints, createPath} from './lib/spiral'
import { connect } from 'react-redux'

class Spiral extends PureComponent {
  render () {
    const {
      cx,
      cy,
      scale,
      editing,
      imgData,
      width,
      colorLight,
      colorDark,
      rings,
      height,
      contrast,
      mouseEnter,
      mouseLeave
    } = this.props
    if (!imgData) return null
    const d = createPath(getPoints({
      contrast,
      cx,
      cy,
      scale,
      width,
      height,
      imgData,
      maxLoops: rings
    }))
    const active = !!imgData && !editing
    const svgLength = Math.min(width / scale, height / scale)
    const radius = svgLength / 2
    const viewBox = `0 0 ${svgLength} ${svgLength}`
    return (
      <svg
        viewBox={viewBox}
        style={{
          opacity: active ? 1 : 0,
          transition: '.2s',
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}>
        <circle
          style={{transition: 'fill .15s'}}
          fill={colorLight}
          r={radius}
          cx={radius}
          cy={radius} />
        <path
          style={{transition: 'fill .15s'}}
          d={d}
          fill={colorDark} />
        {/* For mouse events */}
        <circle
          onMouseEnter={active && mouseEnter ? mouseEnter : undefined}
          onMouseLeave={active && mouseLeave ? mouseLeave: undefined}
          style={{cursor: active ? 'pointer' : 'default'}}
          fill={'transparent'}
          r={radius}
          cx={radius}
          cy={radius} />
      </svg>
    )
  }
}

const mapStateToProps = (state) => {
  const {editing: {editing}, filter: {data: {rings}, colorLight, colorDark}, img: {cx, cy, contrast, scale, data: imgData, width, height}} = state
  return {
    rings,
    colorLight: colorLight[0],
    colorDark: colorDark[0],
    cx,
    cy,
    contrast,
    scale,
    imgData,
    width,
    height,
    editing
  }
}

export default connect(
  mapStateToProps
)(Spiral)