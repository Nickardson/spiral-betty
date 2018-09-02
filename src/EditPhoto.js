import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { blobExifTransform } from './lib/img'
import { scaleInputId } from './lib/constants'

const Container = styled.div`
  width: 100%;
  height: 100%;
  transition: .1s;
  position: absolute;
`
const ImgBg = styled.div`
  background-color: var(--accent);
  opacity: .4;
`
const CircleClip = styled.div`
  clip-path: circle(50%);
  pointer-events: none;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  overflow: hidden;
`
const ImgMove = styled.img`
  opacity: .4;
  cursor: move;
`

class EditPhoto extends Component {
  constructor() {
    super()
    this.state = { // dragging offsets
      x: 0,
      y: 0,
      drag: false
    }
    this.movePhotoId = 'edit-photo'
    this.updateStore = (endEditing) => {
      const {cx, cy, width, height, length, scale} = this.props
      const {x, y} = this.state
      const {width: imgWidth} = this._getPxDim({
        width,
        height,
        scale,
        length
      })
      const photoImgRatio =  width / imgWidth
      this.props.updatePhoto((
        {
          cx: cx - (x * photoImgRatio),
          cy: cy - (y * photoImgRatio),
          endEditing // Allow for scaling while editing
        }
      ))
      this.setState({x: 0, y: 0, drag: false})
    }
    this.clicksOutsideOfPhoto = (e) => {
      // Allow for scaling while editing
      const endEditing = e.target.id === scaleInputId ? false : true
      
      if (e.target.id !== this.movePhotoId) {
        this.updateStore(endEditing)
      }
    }
  }
  onKeyDown = (e) => {
    const keyName = e.key
    console.log(e)
    if(['Escape', 'Enter', ' '].indexOf(keyName) !== -1) {
      e.preventDefault()
      this.updateStore(true)
    }
    console.log('keypress event\n\n' + 'key: ' + keyName)
  }
  onDragStart = (e) => {
    e.preventDefault()
  }
  onMouseDown = (e) => {
    e.preventDefault()
    const {pageX: startX, pageY: startY} = e
    this.startX = startX
    this.startY = startY
    this.setState({drag: true})
  }
  onMouseUp = (e) => {
    this.setState({drag: false})
  }
  onMouseMove = (e) => {
    const {length, width, height, scale, cx, cy} = this.props
    const {pageX, pageY} = e
    const {startX, startY} = this
          
    const deltaX = pageX - startX
    const deltaY = pageY - startY
        
    this.setState(({x: prevX, y: prevY}) => {
      // Get next l, r, t, b
      const {width: pxWidth, height: pxHeight} = this._getPxDim({
        width,
        height,
        scale,
        length
      })
      
      // Default x and y
      let x = prevX + deltaX
      let y = prevY + deltaY
      
      const {top, left} = this._getTopLeft({
        cx,
        cy,
        width,
        height,
        pxWidth,
        pxHeight,
        length,
        offsetX: x,
        offsetY: y
      })
      const right = pxWidth + left
      const bottom = pxHeight + top
      
      // Fix edges of bounds
      const imgToPhotoRatio = pxWidth / width
      const imgCx = cx * imgToPhotoRatio
      const imgCy = cy * imgToPhotoRatio
            
      if (left >= 0) { x = imgCx - (length / 2) }
      if (right < length) { x = imgCx - (pxWidth - length / 2)  }
      if (top >= 0) { y = imgCy - (length / 2) }
      if (bottom < length) { y = imgCy - (pxHeight - length / 2) }
            
      return {x, y}
    })
    
    // Update next starting pt
    this.startX = pageX
    this.startY = pageY
  }
  _getPxDim ({width, height, scale, length}) {    
    const isLandscape = width > height
    const ratio = width / height
    
    return {
      width: isLandscape ? length * ratio * scale : length * scale,
      height: isLandscape ? length * scale : length / ratio * scale
    }
  }
  _getTopLeft ({cx, cy, width, height, pxWidth, pxHeight, length, offsetX, offsetY, flippedLengths}) {
    // - Delta from center of photo at display px
    const pxPhotoCX = (cx / width) * pxWidth
    const pxPhotoCY = (cy / height) * pxHeight
    
    const radius = length / 2 // of art, also center pt of art
    
    const left = radius - pxPhotoCX + offsetX
    const top = radius - pxPhotoCY + offsetY
    return {
      left,
      top
    }
  }
  componentWillReceiveProps (nextProps) {
    const {active: nextActive} = nextProps
    const {active} = this.props
    if (!active && nextActive) {
      document.addEventListener('mousedown', this.clicksOutsideOfPhoto)
      document.addEventListener('keydown', this.onKeyDown)
    }
    if (active && !nextActive) {
      document.removeEventListener('mousedown', this.clicksOutsideOfPhoto)
      document.removeEventListener('keydown', this.onKeyDown)
    }
  }
  render () {
    const {blobUrl, length, width, height, scale, cx, cy, active, flippedLengths, transform} = this.props
    const {drag, x: offsetX, y: offsetY} = this.state
    if (!blobUrl) return null
            
    const {width: pxWidth, height: pxHeight} = this._getPxDim({width, height, scale, length})
    
    const {top, left} = this._getTopLeft({
      cx,
      cy,
      width,
      height,
      pxWidth,
      pxHeight,
      length,
      offsetX,
      offsetY
    })
    
    // Fixes any issues with matrix to get same starting point as 1-4 orientations
    const flippedTransform = flippedLengths ? `translate(${(pxWidth - pxHeight) / 2}px, ${(pxHeight - pxWidth) / 2}px)` : ''

    const photoStyle = {
      transformOrigin: 'center',
      transform: `translate(${left}px, ${top}px) ${flippedTransform} ${transform}`,
      width: flippedLengths ? pxHeight : pxWidth,
      height: flippedLengths ? pxWidth : pxHeight,
      position: 'absolute'
    }
            
    return (
      <Container
        style={{
          pointerEvents: active ? '' : 'none',
          opacity: active ? 1 : 0,
          transition: '.2s'
        }}>
        <ImgBg style={photoStyle} />
        <ImgMove
          id={this.movePhotoId}
          onDragStart={this.onDragStart} // avoid dragging img browser default behavior
          onMouseDown={this.onMouseDown}
          onMouseMove={!drag ? undefined : this.onMouseMove}
          onMouseUp={!drag ? undefined : this.onMouseUp}
          alt={'Uploaded artwork'}
          src={blobUrl}
          style={photoStyle} />
        <CircleClip>
          <img
            alt={'Uploaded artwork'}
            src={blobUrl}
            style={photoStyle} /> 
        </CircleClip>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {img: {cx, cy, scale, width, height, blobUrl, orientation}, preview: {length}, editing: {editing: active}} = state
  const {flippedLengths, transform} = blobExifTransform(orientation)
  return {length, active, cx, cy, scale, blobUrl, width, height, flippedLengths, transform}
}
export default connect(
  mapStateToProps
)(EditPhoto)
