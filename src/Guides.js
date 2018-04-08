import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const color = 'cyan'

const Border = styled.div`
  border-radius: 100%;
  border 1px solid ${color};
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  transition: .4s;
`

const BorderLeft = styled.div`
  width: 1px;
  left: 33%;
  height: 100%;
  position: absolute;
  background-color: ${color};
`
const BorderRight = styled.div`
  width: 1px;
  left: 67%;
  height: 100%;
  position: absolute;
  background-color: ${color};
`
const BorderTop = styled.div`
  width: 100%;
  top: 33%;
  height: 1px;
  position: absolute;
  background-color: ${color};
`
const BorderBottom = styled.div`
  width: 100%;
  top: 67%;
  height: 1px;
  position: absolute;
  background-color: ${color};
`
const BorderVert = styled.div`
  width: 1px;
  left: 50%;
  top: 47%;
  height: 6%;
  position: absolute;
  background-color: ${color};
`
const BorderHoriz = styled.div`
  width: 6%;
  top: 50%;
  left: 47%;
  height: 1px;
  position: absolute;
  background-color: ${color};
`

const Guides = ({active}) => (
  <Border style={{opacity: active ? 1 : 0}}>
    <div style={{clipPath: 'circle(50%)', position: 'absolute', width: '100%', height: '100%'}}>
    <BorderLeft />
    <BorderTop />
    <BorderRight />
    <BorderBottom />
    <BorderVert />
    <BorderHoriz />
    </div>
  </Border>
)

const mapStateToProps = (state) => {
  const {editing: {editing}} = state
  return {active: editing}
}
export default connect(
  mapStateToProps
)(Guides)