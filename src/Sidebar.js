import React from 'react'
import styled from 'styled-components'

const {layout: {sidebar: {width}}} = require('./lib/constants')

const Container = styled.div`
  position: fixed;
  width: ${width}px;
  height: 100%;
  padding: 30px;
`

const Sidebar = ({children}) => (
  <Container>
    {children}
  </Container>
)

export default Sidebar
