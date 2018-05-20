import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Edit from './Edit'

// TODO: !!Add CC credit
import img from './assets/noun_218424_cc.svg'

class Upload extends PureComponent {
  render () {
    const {onChange, blobUrl} = this.props
    const active = !blobUrl
    return (
      <label
        style={{
          pointerEvents: active ? '' : 'none',
          opacity: active ? 1 : 0,
          transition: '.2s',
          overflow: 'hidden',
          borderRadius: '100%',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          border: '1px solid rgba(0,0,0,.25)',
          backgroundColor: '#efefef',
          position: 'absolute'}}>
        <img
          src={img}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100
          }} />
        <div
          style={{
            color: '#999',
            borderRadius: '5px',
            position: 'absolute',
            height: 20,
            marginTop: 55,
            textTransform: 'uppercase',
            lineHeight: 1.5,
            left: '50%',
            top: '50%',
            fontSize: 12,
            width: 220,
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
          }}>
          click to upload image
        </div>
        <input
          type='file'
          onChange={onChange}
          style={{
            zIndex: -2,
            position: 'absolute',
            left: '-100%',
            top: '-100%'
          }}/>
      </label>
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
