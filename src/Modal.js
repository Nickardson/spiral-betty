import React from 'react'
import styled from 'styled-components'
import {Button, SecondaryButton} from './Button'

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;  
  overflow: hidden;
  z-index: 2000;
  background-color: rgba(0,0,0,.2);
`
const Container = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 20px;
  min-width: 200px;
  min-height: 200px;
  margin-top: -20px;
  position: relative;
`
const Inner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  text-transform: uppercase;
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: var(--accent);
`
const Description = styled.div`
  font-size: 14px;
`

const Modal = ({onConfirm, onCancel, cancelText, confirmText, type = 'error', description = 'Image could not be used. Double check your filetype.', title = 'Uh oh!'}) => {
  return <Overlay>
    <Container className='pos-center'>
    <Inner>
    <div style={{margin: 'auto'}}>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <div><SecondaryButton></SecondaryButton><Button></Button></div></div>
    </Inner>
    </Container>
  </Overlay>
}

export default Modal