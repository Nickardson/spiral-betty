import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  width: 280px;
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
