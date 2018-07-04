import React, { Component } from 'react'
import { connect } from 'react-redux'
import WorkspaceIconAndText from './WorkspaceIconAndText'

import styled from 'styled-components'

const Label = styled.label`
  transition: .2s;
  border-radius: 100%;
  cursor: pointer;
`

// TODO: animation timing, store as var
class Upload extends Component {
  state = {hover: false, dragging: 0}
  onDrop = (e) => {
    e.preventDefault()
    // TODO: set state
    this.props.onChange({target: e.dataTransfer})
    if (this.props.isFirefox) return // FF kinda sucks at this stuff
    this.setState(({dragging: d, ...props}) => {return {...props, dragging: 0}}, () => {
      // Keeping children from firing (pointer events turned off)
      document.getElementsByTagName( 'html' )[0].classList.remove('file-dragging')
    })
  }
  onDragEnter = (e) => {
    e.preventDefault()
    if (this.props.isFirefox) return // FF kinda sucks at this stuff
    document.getElementsByTagName('html')[0].classList.add('file-dragging')
    this.setState(({dragging: d, ...props}) => {return {...props, dragging: d + 1}})
  }
  onDragOver = (e) => {e.preventDefault()}
  onDragLeave = (e) => {
    e.preventDefault()
    if (this.props.isFirefox) return // FF kinda sucks at this stuff
    this.setState(({dragging: d, ...props}) => {return {...props, dragging: d - 1}}, () => {
      if (this.state.dragging <= 0) {
         // Turn back on pointer events
        document.getElementsByTagName( 'html' )[0].classList.remove('file-dragging')
      }
    })
  }
  onMouseEnter = () => { this.setState({hover: true}) }
  onMouseLeave = () => { this.setState({hover: false}) }
  componentDidMount () {
    window.addEventListener('dragenter', this.onDragEnter)
    window.addEventListener('dragleave', this.onDragLeave)
    window.addEventListener('dragover', this.onDragOver)
    window.addEventListener('drop', this.onDrop)
  }
  componentWillUnmount () {
    window.removeEventListener('dragenter', this.onDragEnter)
    window.removeEventListener('dragleave', this.onDragLeave)
    window.removeEventListener('dragover', this.onDragOver)
    window.removeEventListener('drop', this.onDrop)
  }
  render () {
    const {onChange, blobUrl} = this.props
    const {hover, dragging} = this.state
    const active = !blobUrl || dragging
    const showHover = dragging || hover
    const line = dragging ? 'dashed' : 'solid'
    let backgroundColor = '#efefef'
    if (showHover) backgroundColor = '#fff'
    if (blobUrl && dragging) backgroundColor = 'rgba(255,255,255,.8)'
    return (
      <Label
        className='pos-full'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          pointerEvents: active ? '' : 'none',
          opacity: active ? 1 : 0,
          backgroundColor,
          border: showHover ? `3px ${line} var(--accent)` : `1px ${line} rgba(0,0,0,.25)`,
        }}>
        <div className='pos-full' style={{backgroundColor: 'var(--accent)', transition: '.2s', borderRadius: '100%', opacity: showHover ? 0.2 : 0}} />
        <WorkspaceIconAndText active={showHover} text={blobUrl ? '+ Replace image' : '+ Upload image'} type='placeholder' />
        {/* Hide input so we can style label */}
        <input
          type='file'
          onChange={onChange}
          style={{
            zIndex: -1000,
            position: 'absolute',
            left: '-10000%',
            top: '-10000%'
          }}/>
      </Label>
    )
  }
}

const mapStateToProps = (state) => {
  const {img: {blobUrl}, temp: {isFirefox}} = state
  return {blobUrl, isFirefox}
}
export default connect(
  mapStateToProps
)(Upload)
