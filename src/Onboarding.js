import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Button, SecondaryButton} from './Button'

const boxShadow = '0 1px 3px rgba(0,0,0,.2)'
const Item = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 1.5;
`
const Number = styled.div`
  transform: rotate(-10deg);
  width: 32px;
  height: 32px;
  background-color: var(--accent);
  border-radius: 100%;
  border: 2px solid #fff;
  box-shadow: ${boxShadow};
  bottom: -6px;
  position: absolute;
  left: -12px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  padding-left: 1px;
  padding-top: 1px;
`
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const Diagram = styled.div`
  margin: 0 auto;
  position: relative;
  margin-bottom: 15px;
  width: 120px;
  height: 120px;
`
class Onboarding extends React.PureComponent {
  triggerUpload () {
    document.getElementById('upload-btn').click()
  }
  triggerDemoImage () {
    document.getElementById('try-demo-image').click()
  }
  render () {
    return (
      <Fragment>
        <Container>
          <Item><Diagram><img alt={'Upload'} src={'assets/imgs/onboard-sm-1.jpg'} style={{transform: 'rotate(5deg)', width: '100%', height: '100%', border: '2px solid #fff', boxShadow}} /><Number>1</Number></Diagram><p><Button onClick={this.triggerUpload}>Upload an image</Button><br />– or –<br /><SecondaryButton type={'subtle'} onClick={this.triggerDemoImage}>Try demo image</SecondaryButton></p></Item>
          <Item><Diagram><img alt={'Crop, scale, and move'} src={'assets/imgs/onboard-sm-2.jpg'} style={{transform: 'rotate(5deg)', width: '100%', height: '100%'}} /><Number>2</Number></Diagram><p>Crop, scale, and<br />move image in circle</p></Item>
          <Item><Diagram><img alt={'Spiralize, edit, and download'} src={'assets/imgs/onboard-sm-3.jpg'} style={{transform: 'rotate(5deg)', width: '100%', height: '100%'}} /><Number>3</Number></Diagram><p>Spiralize, edit,<br />and download</p></Item>
        </Container>
      </Fragment>
    )
  }
}

export default Onboarding