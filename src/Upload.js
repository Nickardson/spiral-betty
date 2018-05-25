import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconPhotoPlaceholder from './IconPhotoPlaceholder'
import {UploadText} from './Text'

import styled from 'styled-components'

const Label = styled.label`
  transition: .2s;
  border-radius: 100%;
  cursor: pointer;
  background-color: #efefef;
`

// TODO: animation timing, store as var
class Upload extends Component {
  state = {hover: false}
  onMouseEnter = () => { this.setState({hover: true}) }
  onMouseLeave = () => { this.setState({hover: false}) }
  render () {
    const {onChange, blobUrl} = this.props
    const active = !blobUrl
    const {hover} = this.state
    return (
      <Label
        className='pos-full'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          pointerEvents: active ? '' : 'none',
          opacity: active ? 1 : 0,
          border: hover ? '3px solid var(--accent)' : '1px solid rgba(0,0,0,.25)',
        }}>
        <IconPhotoPlaceholder length={100} className="pos-center" active={hover} />
        <div
          className='pos-center'
          style={{marginTop: 68}}>
          <UploadText
            style={{
              textAlign: 'center',
              color: hover ? 'var(--accent)' : '',
              transition: '.2s'
            }}>
            + Upload image
          </UploadText>
        </div>
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
  const {img: {blobUrl}} = state
  return {blobUrl}
}
export default connect(
  mapStateToProps
)(Upload)
