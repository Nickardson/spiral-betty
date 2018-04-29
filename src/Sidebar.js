import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: ${60 * 2 + 15 + 35 * 2}px;
  height: 100%;
  padding: 35px;
  overflow-y: auto; 
`

const Sidebar = ({children}) => (
  <Container id='sidebar'>
    {children}
  </Container>
)

export default Sidebar
