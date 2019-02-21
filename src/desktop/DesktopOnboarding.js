import React from 'react'
import styled from 'styled-components'
import {Button, SecondaryButton} from '../Button'
import DesktopOnly from './DesktopOnly'
import DesktopOnboardingItem from './DesktopOnboardingItem'

const Container = styled(DesktopOnly)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
class DesktopOnboarding extends React.PureComponent {
  triggerUpload () {
    document.getElementById('upload-btn').click()
  }
  triggerDemoImage () {
    document.getElementById('try-demo-image').click()
  }
  render () {
    return (
      <Container>
        <DesktopOnboardingItem
          alt={'Upload'}
          src={'assets/imgs/onboard-sm-1.jpg'}
          imgStyle={{border: '2px solid #fff'}}
          imgBoxShadow
          number={1}>
          <p>
            <Button onClick={this.triggerUpload}>
              Upload an image
            </Button>
            <br />– or –<br />
            <SecondaryButton
              type={'subtle'}
              onClick={this.triggerDemoImage}>
              Try demo image
            </SecondaryButton>
          </p>
        </DesktopOnboardingItem>
        <DesktopOnboardingItem
          alt={'Crop, scale, and move'}
          src={'assets/imgs/onboard-sm-2.jpg'}
          number={2}>
          <p>Crop, scale, and<br />move image in circle</p>
        </DesktopOnboardingItem>
        <DesktopOnboardingItem
          alt={'Spiralize, edit, and download'}
          src={'assets/imgs/onboard-sm-3.jpg'}
          number={3}>
          <p>Crop, scale, and<br />move image in circle</p>
        </DesktopOnboardingItem>
      </Container>
    )
  }
}

export default DesktopOnboarding