import React, { PureComponent } from 'react'
import {getPoints, createPath} from './lib/spiral'
import { connect } from 'react-redux'
import styled from 'styled-components'

const {layout: {ids: {spiralSvg}}} = require('./lib/constants')

const Svg = styled.svg`
  transition: .05s;
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  path, circle { /* since we are pulling svg from html we want decouple these interactive elements */
    transition: fill .05s; 
  }
  > *:first-child { /* base */
    pointer-events: all;
  }
`

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
    const points = getPoints({
      contrast,
      cx,
      cy,
      scale,
      width,
      height,
      imgData,
      maxLoops: rings
    })
    const d = createPath(points)
    const active = !!imgData && !editing
    const svgLength = Math.min(width / scale, height / scale)
    const radius = svgLength / 2
    const viewBox = `0 0 ${svgLength} ${svgLength}`
    return (
      <Svg
        id={spiralSvg}
        viewBox={viewBox}
        style={{opacity: active ? 1 : 0}}>
        <circle
          onMouseEnter={active && mouseEnter ? mouseEnter : undefined}
          onMouseLeave={active && mouseLeave ? mouseLeave: undefined}
          style={{cursor: active ? 'pointer' : 'default'}}
          fill={colorLight}
          r={radius}
          cx={radius}
          cy={radius} />
        <path
          d={d}
          fill={colorDark} />
      </Svg>
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