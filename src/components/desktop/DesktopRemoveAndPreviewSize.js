import React from 'react'
import DesktopOnly from './DesktopOnly'
import styled from 'styled-components'
import Size from '../Size'
import {SecondaryButton} from '../Button'
import CloseIcon from '../CloseIcon'

const Container = styled.div`
  position: absolute;
  top: 19px;
  left: 23px;
  z-index: 100; /* TODO: why? */
`

const DesktopRemoveAndPreviewSize = ({
  editing,
  animating,
  blobUrl,
  length,
  name,
  setPreview,
  removeImg
}) => {
  const hide = editing || animating || !blobUrl
  return <DesktopOnly>
    <Container style={{display: hide ? 'none' : ''}}>
      {/* Remove image */}
      <SecondaryButton
        type={'error'}
        style={{
          marginBottom: 10,
          position: 'relative'
        }}
        onClick={removeImg}>
        <span style={{paddingRight: 20}}>Remove image</span>
        <span style={{
          position: 'absolute',
          right: 16,
          top: 7,
          width: 14,
          height: 14
        }}>
          <CloseIcon />
        </span>
      </SecondaryButton>
      {/* Select preview size */}
      <Size
        length={length}
        name={name}
        disabled={editing || animating}
        setPreview={setPreview} />
    </Container>
  </DesktopOnly>
}

export default DesktopRemoveAndPreviewSize