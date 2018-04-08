import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const Canvas = ({children, length}) => (
  <Container
    style={{
      width: length,
      height: length
    }}>
    {children}
  </Container>
)


const mapStateToProps = (state) => {
  const {preview: {length}} = state
  return {
    length
  }
}
export default connect(
  mapStateToProps
)(Canvas)
