import React, { Component } from 'react'
import SpiralLine from './SpiralLine'
import SpiralCircle from './SpiralCircle'
import {getPoints, createPath} from './lib/spiral'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {startEditingPhoto} from './redux/actions'

const {layout: {ids: {spiralSvg}}, easing, maskId, coloring} = require('./lib/constants')

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
  mask {
    fill: #fff;
  }
`

// TODO: move functions into own file
class Spiral extends Component {
  constructor (props) {
    super()
    this.animMaskId = 'anim-mask'
  }
  componentDidUpdate(prevProps) {
    // Animate when going from editing to not
    if (!this.props.editing && prevProps.editing) {
      const {outter, inner, loopsInfo} = this.getLoopsInfoAndAddEmptyPathsToMask()
      // Start the animation
      requestAnimationFrame(() => { this.animate({outter, inner, loopsInfo, count: 0})})
      
    }
  }
  animate({outter, inner, loopsInfo, count}) {
    if (count <= 100) {
      loopsInfo.forEach(({start, loopLength}, j) => {
        const index = start + (easing.easeInOut(count / 100) * loopLength) //+ after
        const p = createPath({
          outter: outter.slice(start, index),
          inner: inner.slice(start, index)
        })
        document.getElementById(this.animMaskId).getElementsByTagName('path')[j].setAttribute("d", p)
      })
      const nextCount = loopsInfo.length > 100 ? count + 10 : count + 4 // go faster when we have more rings
      requestAnimationFrame((hrt) => { this.animate({outter, inner, loopsInfo, count: nextCount})})
    } else {
      // When animation is done... remove animating mask entirely... no longer needed
      let elem = document.getElementById(this.animMaskId)
      elem.parentNode.removeChild(elem)
    }
  }
  getLoopStartLengthAndOffset({offsetFactor, i, loopIndexes, loopsLength, length, onlyOffset = false}) { 
    // Regular start without offset yet (basically at deg 0)
    let start = loopIndexes[i] 
    
    // Loop if we went all the way around
    let loopLength = i + 1 < loopsLength
      ? loopIndexes[i + 1] - start + 1 // not last loop: get length (next start - this start, and add 1 to link loops)
      : length - start // last loop: full length of points - this start

    // Apply offsets to the start/length
    const percentStart = (i % offsetFactor) / offsetFactor
    const offset = Math.round(percentStart * loopLength)
    
    if (onlyOffset) return {offset}
    
    start = start + offset // new start
    loopLength = loopLength - offset // new length
    
    return {start, loopLength}
  }
  getLoops = () => {
    const {loopIndexes, outter, inner} = this.getPointsFromProps(this.props)
    let loops = []
    const loopsLength = loopIndexes.length
    for (let i = 0; i < loopsLength; i++) {
      const start = loopIndexes[i]
      const end = i + 1 === loopsLength ? outter.length : loopIndexes[i + 1] + 1
      loops.push(createPath({
        outter: outter.slice(start, end),
        inner: inner.slice(start, end)
      }))
    }
    return loops
  }
  getLoopsInfoAndAddEmptyPathsToMask = () => {
    const {loopIndexes, outter, inner} = this.getPointsFromProps(this.props)
    const length = outter.length
    const loopsLength = loopIndexes.length
    const loopsInfo = []
    const offsetFactor = 8 // segments where animation starts divide up 360 by this
    const mask = document.getElementById(this.animMaskId)
    
    // Loop through loops :)
    for (let i = 0; i < loopsLength; i++) { 
      // Where to start each loop
      let {start, loopLength} = this.getLoopStartLengthAndOffset({
        offsetFactor,
        i,
        loopIndexes,
        loopsLength,
        length
      })

      // If next loop has an offset... we'll want to add that to our length
      let nextOffset = 0
      if (i !== (loopLength - 1)) { // don't do this for lass loop
        ({offset: nextOffset} = this.getLoopStartLengthAndOffset({
          offsetFactor,
          i: i + 1,
          loopIndexes,
          loopsLength,
          length,
          onlyOffset: true
        }))
      }
      
      loopsInfo.push({
        loopLength: loopLength + nextOffset,
        start
      })
      
      // Add path for our loop to our mask (empty for now)
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      mask.appendChild(path)
    }
    return {outter, inner, loopsInfo}
  }
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
    const { editing, startEditingPhoto, imgData, width, scale, colorIndex, height, mouseEnter, mouseLeave, cx, cy, rings, contrast, lightness } = this.props
    if (!imgData || editing) return null
    const active = !!imgData && !editing
    const svgLength = Math.min(width / scale, height / scale)
    const radius = svgLength / 2
    const viewBox = `0 0 ${svgLength} ${svgLength}`
    
    const colorData = coloring[colorIndex]
    const {fill: {line, background}} = colorData
    const bgColorData = colorData[background]
    const lineColorData = colorData[line]
    
    return (
      <Svg
        id={spiralSvg}
        viewBox={viewBox}
        style={{opacity: active ? 1 : 0}}>
        <defs>
          {/* Animation mask */}
          <mask id={this.animMaskId}></mask>
        </defs>
        <SpiralCircle
          defPrefix={'main'}
          onMouseUp={() => {startEditingPhoto()}}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          style={{
            cursor: active ? 'pointer' : 'default',
            pointerEvents: 'all'
          }}
          radius={radius}
          colorData={bgColorData} />
        <g
          mask={`url(#${this.animMaskId})`}
          style={{pointerEvents: 'none'}}> 
          <SpiralLine
            // key={`${scale}-${cx}-${cy}-${rings}-${contrast}-${lightness}-spiral`}
            defPrefix={'main'}
            maskId={maskId}
            colorData={lineColorData} />
        </g>
      </Svg>
    )
  }
}

const mapStateToProps = (state) => {
  const {editing: {editing}, filter: {data: {rings}, colorIndex}, img: {cx, cy, contrast, lightness, scale, data: imgData, width, height}} = state
  return {
    rings,
    colorIndex,
    cx,
    cy,
    contrast,
    scale,
    imgData,
    width,
    height,
    editing,
    lightness
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startEditingPhoto: () => dispatch(startEditingPhoto())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spiral)