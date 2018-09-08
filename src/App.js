import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Beforeunload from 'react-beforeunload'

import {Link} from './Text'

import Onboarding from './Onboarding'
import Logo from './Logo'
import Upload from './Upload'
import Workspace from './Workspace'
import Guides from './Guides'
import EditPhoto from './EditPhoto'
import DemoImage from './DemoImage'
import Filter from './Filter'
import DownloadCanvas from './DownloadCanvas'
import Size from './Size'
import SectionSliderScale from './SectionSliderScale'
import Swatches from './Swatches'
import {InvertIcon} from './SectionSliderScale'
import {SecondaryButton} from './Button'

import {
  addFilter,
  setup,
  updateImgPos,
  clearImg,
  addTempProp,
  updateFilter,
  startEditingPhoto,
  updateContrast,
  endEditingPhoto,
  addImgData,
  updateLightness
} from './redux/actions'
import { scaleInputId, rings, lightnessVals, contrastVals } from './lib/constants'
import { getImageData } from './lib/img'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.editing ? '#222' : ''};
  transition: .5s;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px)  {
    flex-direction: column;
  }
`
const DesktopOnly = styled.div`
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    display: none;
  }
`

const Main = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  z-index: 100;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    height: initial;
    flex: 4;
  }
`

const WorkspaceContainer = styled.div`
  display: flex;
  height: calc(100% - 100px);
`
const MobileMargin = styled.div`
  display: none;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    display: flex;
    flex: 0 0 5vh;
  }
`
const Sidebar = styled.div`
  flex: 0 0 250px; 
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ccc;
  background-color: #fff;
  height: 100%;
  padding: 20px 15px;
  overflow-y: auto; 
  transition: .5s;
  ${props => props.hide ? `
    transform: translateX(300px);
    opacity: 0
  ` : ''}
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    z-index: 100;
    width: 100%;
    bottom: 0;
    flex: 0 0 90px;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 5px;
    overflow-y: hidden;
    overflow-x: scroll;
    background-color: #efefef;
    border-top: 1px solid #ccc;
    transition: .3s;
    ${props => props.hide || props.noImg ? `
      transform: translateY(90px);
      opacity: 0;
    ` : ''}
  }
`
const CloseIcon = styled.div`
  width: 100%;
  height: 100%;    
  position: relative;
  
  &::after, &::before{
      position:absolute;
      left:0;
      top: calc(50% - .5px);
      content:'';
      display:block;
      width:100%;
      height:1px;
      background-color: currentColor;
      transform-origin: center;
  }
  &::after {
      transform: rotate(45deg);
  }
  &::before {
      transform: rotate(-45deg);
  }
  ${SecondaryButton}:hover &::after, ${SecondaryButton}:hover &::before {
    top: calc(50% - 1px);
    height: 2px;
  }
`

const MobileHeader = styled.div`
  display: none;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    display: flex;
    flex: 0 0 45px;
    height: 45px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    border-bottom: 1px solid #efefef;
    transition: .2s;
    ${props => props.hide ? `
      transform: translateY(-35px);
      opacity: 0;
    ` : ''}
  }
`

const NavLinks = styled.span`
  transition: .2s;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  color: #ccc;
  padding: 5px 10px;
  border-radius: 50px;
  :hover {
    color: #fff;
    background-color: var(--accent);
    scale: 1.1;
  }
  ${props => props.active ? `
    color: var(--accent) !important;
    background-color: transparent !important;
  ` : ''}
  ${props => props.disabled ? `
    color: #ddd !important;
    background-color: transparent !important;
    pointer: none;
    pointer-events: none;
  ` : ''}
`

const SliderContainer = styled.div`
  position: absolute;
  width: 80%;
  min-width: 300px;
  bottom: -65px;
  left: 50%;
  transform: translate(-50%);
  @media only screen and (orientation: portrait), (max-width: 1000px) {
    width: 100%;
  }
`
const SecondaryActions = styled.div`
  position: absolute;
  top: 19px;
  left: 23px;
  z-index: 100;
`

class App extends Component {
  handleRingChange = val => {
    this.props.updateRings(val)
  }
  handleScaleChange = scale => {
    const {
      img: { scale: prevScale, cx: prevCx, cy: prevCy, width, height },
      updateImgPos
    } = this.props
    if (prevScale <= scale) {
      // Increasing in scale, we're good to go and update
      updateImgPos(scale)
    } else {
      // Decreasing in scale, need to double check that cx & cy are still ok or fix

      // We need to make sure that we are still in bounds...
      const isLandscape = width > height

      // Starting pt... will change if not valid anymore
      let cx = prevCx
      let cy = prevCy

      // Fitting a square in our photo... what is the size of our photo area compared to our photo
      const dzRad = isLandscape ? height / scale / 2 : width / scale / 2

      // Find mix/max cx/cy for this new value
      // Put this square in our photo upper left
      const minCx = dzRad
      const minCy = dzRad
      // Put this square in our photo lower right
      const maxCx = width - minCx
      const maxCy = height - minCy

      // Is our current cx/cy fine?
      if (prevCx < minCx) {
        cx = minCx
      }
      if (prevCx > maxCx) {
        cx = maxCx
      }
      if (prevCy < minCy) {
        cy = minCy
      }
      if (prevCy > maxCy) {
        cy = maxCy
      }

      updateImgPos(scale, cx, cy)
    }
  }
  handleContrastChange = val => {
    const { updateContrast } = this.props
    updateContrast(val)
  }
  handleLightnessChange = val => {
    const { updateLightness } = this.props
    updateLightness(val)
  }
  updateImage = updates => {
    const { scale, cx, cy, endEditing } = updates
    const { updateImgPos, endEditingPhoto } = this.props
    updateImgPos(scale, cx, cy)
    if (endEditing) endEditingPhoto()
  }
  removeImg = () => {
    const val = window.confirm('Are you sure you want to remove this image?')
    if (val) {
      window.URL.revokeObjectURL(this.props.blobUrl)
      this.props.clearImg()
    }
  }
  handleFile = (url, file, revokeUrl) => {
    // TODO: get img data for 2x the size of the spiral length
    this.getOrientation(file, orientation => {
      getImageData(url, orientation).then(
        ({ status, width, height, imgData: data }) => {
          if (status === 'ok') {
            const { startEditingPhoto, addImgData } = this.props
            if (revokeUrl) window.URL.revokeObjectURL(revokeUrl) // we have had some success... now time to revoke old url
            startEditingPhoto()
            addImgData(
              url,
              contrastVals.default,
              lightnessVals.default,
              1,
              width,
              height,
              data,
              orientation || 1,
              file.name
            )
          } else {
            // TODO: make this a pretty error
            alert('Sorry, we could not load image data for this file. Check to make sure you are using JPG, GIF, PNG, or WebP.')
          }
        }

      )
    })
  }
  handleFileChange = e => {
    const file = e.target.files[0]
    if (!file || !file.name) return
    const blobUrl = URL.createObjectURL(file)
    const {blobUrl: revokeUrl} = this.props
    this.handleFile(blobUrl, file, revokeUrl)
    // Clear out file...
    e.target.value = ''
  }
  getOrientation(file, callback) {
    // TODO: move to img utils
    // Source: https://stackoverflow.com/a/32490603/2824643
    var reader = new FileReader()
    reader.onload = function(e) {
      var view = new DataView(e.target.result)
      if (view.getUint16(0, false) !== 0xffd8) return callback(-2)
      var length = view.byteLength,
        offset = 2
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) return callback(-1)
        var marker = view.getUint16(offset, false)
        offset += 2
        if (marker === 0xffe1) {
          if (view.getUint32((offset += 2), false) !== 0x45786966)
            return callback(-1)

          var little = view.getUint16((offset += 6), false) === 0x4949
          offset += view.getUint32(offset + 4, little)
          var tags = view.getUint16(offset, little)
          offset += 2
          for (var i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little))
            }
          }
        } else if ((marker & 0xff00) !== 0xff00) {
          break
        } else {
          offset += view.getUint16(offset, false)
        }
      }
      return callback(-1)
    }
    reader.readAsArrayBuffer(file.slice(0, 131072)) // just to get exif
  }
  componentWillMount() {
    // Setup store
    const { addFilter, setup, addTempProp } = this.props
    addFilter()
    updateContrast(contrastVals.default)
    updateLightness(lightnessVals.default)
    addTempProp('attribute', 'rings')
    setup()
  }
  getSliderProps = () => {
    const {attribute, editing, scale, lightness, contrast, data} = this.props
    let attr = editing ? 'scale' : attribute
    switch (attr) {
      case 'scale':
        return {
          editing: editing,
          sliderProps: { id: scaleInputId },
          title: 'Scale',
          min: 1,
          max: 3,
          onValueChange: v => {
            return `${Math.round(v * 100)}%`
          },
          step: 0.05,
          value: scale || 1,
          defaultValue: scale || 1,
          onChange: this.handleScaleChange
        }
      case 'rings':
        return {
          title: 'Rings',
          min: rings.min,
          max: rings.max,
          step: rings.step,
          defaultValue: data.rings,
          onChange: this.handleRingChange
        }
      case 'lightness':
        return {
          title: 'Lightness',
          onValueChange: v => {
            return `${Math.round(v/200 * 100 + 50)}%`
          },
          min: lightnessVals.min,
          max: lightnessVals.max,
          step: lightnessVals.step,
          defaultValue: lightness,
          onChange: this.handleLightnessChange
        }
      case 'contrast':
        return {
          title: 'Contrast',
          onValueChange: v => {
            return `${Math.round(v/200 * 100 + 50)}%`
          },
          min: contrastVals.min,
          max: contrastVals.max,
          step: contrastVals.step,
          defaultValue: contrast,
          onChange: this.handleContrastChange
        }
      default:
        return {}
    }
  }
  render() {
    const {
      attribute,
      init,
      addTempProp,
      editing,
      animating,
      img: { blobUrl, data: imgData }
    } = this.props
    if (!init) return null
    /* return <Splash /> */
    return (
      <Container editing={editing}>
        <Beforeunload onBeforeunload={() => "Sure you want to leave this site? You will lose your progress"} />
        <MobileHeader
          hide={editing || animating}>
          {blobUrl && !editing && !animating && ([<div style={{width: 40, height: 40, left: 5, top: 3, position: 'absolute'}} onClick={this.removeImg}><CloseIcon style={{width: 26, height: 26, position: 'absolute', left: 6, top: 6}}  /></div>,
        <div style={{position: 'absolute', right: 6, top: 3, height: 40, width: 40}}><DownloadCanvas /></div>])
        }
          <Logo style={{height: '13px', margin: 'auto', fill: '#777'}} />
        </MobileHeader>
        <MobileMargin />
        <Main id='main'>
          <DesktopOnly>
            <SecondaryActions style={{display: editing || animating || !blobUrl ? 'none' : ''}}>
              <SecondaryButton
                type={'error'}
                style={{marginBottom: 10, position: 'relative'}}
                onClick={this.removeImg}>
                <span style={{paddingRight: 20}}>Remove image</span><span style={{position: 'absolute', right: 16, top: 7, width: 14, height: 14}}><CloseIcon /></span>
              </SecondaryButton>
              <div>
                <Size disabled={editing || animating} />
              </div>
            </SecondaryActions>
          </DesktopOnly>
          <WorkspaceContainer>
            <Workspace>
              <Filter />
              <EditPhoto updatePhoto={this.updateImage} />
              <Guides />
              <Upload onChange={this.handleFileChange} />
                <SliderContainer>
                  {!animating && <SectionSliderScale
                    disabled={!blobUrl || animating}
                    showBackground={editing}
                    key={editing ? 'scale' : attribute}
                    {...this.getSliderProps()} />}
                </SliderContainer> 
                <div style={{position: 'absolute', visibility: 'hidden', width: '80%', minWidth: 300, bottom: -100, left: '50%', transform: 'translate(-50%)'}}>
                  {/* TODO: use local storage to not show this if they have been here before */}
                  <DemoImage blobUrl={blobUrl} handleFile={this.handleFile} />
                </div>
                <div style={{position: 'absolute', width: '80%', minWidth: 300, bottom: -90, left: '50%', transform: 'translate(-50%)'}}>
                {!editing && !animating && <div style={{fontSize: 10, justifyContent: 'space-evenly', display: 'flex', alignItems: 'center', textTransform: "uppercase", textAlign: 'center'}}>
                  <NavLinks disabled={!blobUrl} active={attribute === 'rings' && !editing} onClick={() => {addTempProp('attribute', 'rings')}}>Rings</NavLinks>
                  <NavLinks disabled={!blobUrl} active={attribute === 'scale' || editing} onClick={() => {addTempProp('attribute', 'scale')}}>Scale</NavLinks>
                  <NavLinks disabled={!blobUrl} active={attribute === 'lightness' && !editing} onClick={() => addTempProp('attribute', 'lightness')}>Lightness</NavLinks>
                  <NavLinks disabled={!blobUrl} active={attribute === 'contrast' && !editing} onClick={() => addTempProp('attribute', 'contrast')}>Contrast</NavLinks>
                  </div>}
                </div>
            </Workspace>
          </WorkspaceContainer>
          <DesktopOnly>
            {!editing && !animating && blobUrl && <InvertIcon style={{position: 'absolute', right: 15, top: 15, height: 70, width: 70, borderRadius: '100%'}}><DownloadCanvas width={1} /></InvertIcon>}
          </DesktopOnly>
        </Main>
        <MobileMargin />
        <Sidebar hide={editing || animating} noImg={!blobUrl}>
          <DesktopOnly>
            <div><Logo style={{width: '100%', fill: '#777'}} /></div>
            <div style={{marginTop: 5, fontSize: 12}}>
              <Link target={'_blank'} href={'https://twitter.com/shalanahfaith'}>©2018 Shalanah Dawson</Link>
            </div>
            <div style={{marginTop: 5, fontSize: 12}}>Downloads free to use for non&#8209;commercial purposes.</div>
          </DesktopOnly>
          {!!imgData && !editing && !animating && <Swatches />}
          {!blobUrl && <Onboarding />}
        </Sidebar>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {
    editing: { editing },
    setup: { init },
    img: { scale, blobUrl, lightness, contrast },
    img,
    filter: {data},
    temp: {animating, attribute}
  } = state
  return { init, scale, img, blobUrl, editing, animating, attribute, lightness, contrast, data }
}
const mapDispatchToProps = dispatch => {
  return {
    addFilter: () => dispatch(addFilter('spiral', { rings: rings.default }, 0)),
    setup: () => dispatch(setup()),
    updateRings: rings =>
      dispatch(updateFilter(undefined, undefined, { rings })),
    startEditingPhoto: () => dispatch(startEditingPhoto()),
    endEditingPhoto: () => dispatch(endEditingPhoto()),
    addImgData: (
      blobUrl,
      contrast,
      lightness,
      scale,
      width,
      height,
      data,
      orientation,
      name
    ) =>
      dispatch(
        addImgData(
          blobUrl,
          contrast,
          lightness,
          scale,
          width,
          height,
          data,
          orientation,
          name
        )
      ),
    updateImgPos: (scale, cx, cy) => dispatch(updateImgPos(scale, cx, cy)),
    updateContrast: contrast => dispatch(updateContrast(contrast)),
    updateLightness: lightness => dispatch(updateLightness(lightness)),
    addTempProp: (prop, value) => dispatch(addTempProp(prop, value)),
    clearImg: () => dispatch(clearImg())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
