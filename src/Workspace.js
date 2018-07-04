import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  left: 50%;
  top: 50%;
  margin-top: -8px;
  transform: translate(-50%, -50%);
  position: absolute;
`

const Workspace = ({children, length}) => (
  <Container 
    style={{
      width: length,
      height: length,
      transition: '.2s'
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
)(Workspace)
