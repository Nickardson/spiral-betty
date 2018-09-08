import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const length = 1
const Border = styled.div`
  border-radius: 100%;
  border 3px solid var(--accent);
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  transition: .4s;
  clip-path: circle(50%); // for safari
`
const BorderLeft = styled.div`
  width: ${length}px;
  left: 33%;
  height: 100%;
  position: absolute;
  background-color: var(--accent);
`
const BorderRight = styled.div`
  width: ${length}px;
  left: 67%;
  height: 100%;
  position: absolute;
  background-color: var(--accent);
`
const BorderTop = styled.div`
  width: 100%;
  top: 33%;
  height: ${length}px;
  position: absolute;
  background-color: var(--accent);
`
const BorderBottom = styled.div`
  width: 100%;
  top: 67%;
  height: ${length}px;
  position: absolute;
  background-color: var(--accent);
`
const BorderVert = styled.div`
  width: ${length}px;
  left: 50%;
  top: 47%;
  height: 6%;
  margin-left: -${length / 2}px;
  position: absolute;
  background-color: var(--accent);
`
const BorderHoriz = styled.div`
  width: 6%;
  top: 50%;
  left: 47%;
  margin-top: -${length / 2}px;
  height: ${length}px;
  position: absolute;
  background-color: var(--accent);
`

const Guides = ({ active }) => (
  <Border
    style={{
      opacity: active ? 1 : 0,
      pointerEvents: 'none'
    }}>
    <BorderLeft />
    <BorderTop />
    <BorderRight />
    <BorderBottom />
    <BorderVert />
    <BorderHoriz />
  </Border>
)

const mapStateToProps = state => {
  const {
    editing: { editing }
  } = state
  return { active: editing }
}
export default connect(mapStateToProps)(Guides)
