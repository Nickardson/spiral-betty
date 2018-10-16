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
import CloseIcon from './CloseIcon'
import SliderContainer from './SliderContainer'
import Main from './Main'
import WorkspaceContainer from './WorkspaceContainer'
import DesktopOnly from './DesktopOnly'
import Sidebar from './Sidebar'
import NavLinks from './NavLinks'
import MobileMargin from './MobileMargin'
import MobileHeader from './MobileHeader'
import SecondaryActions from './SecondaryActions'
import AppContainer from './AppContainer'

import {
  setup,
  updateImgPos,
  clearImg,
  startEditingPhoto, 
  updateContrast,
  endEditingPhoto,
  addImgData,
  updateLightness
} from './redux/actions'
import { scaleInputId, rings, lightnessVals, contrastVals, sizes } from './lib/constants'
import { getImageData } from './lib/img'

class App extends Component {
  state = {
    attribute: 'rings', // active attribute
    clickedDownload: false,
    animating: false,
    preview: sizes[0],
    filter: {
      name: 'spiral',
      colorIndex: 0,
      data: {
        rings: rings.default
      }
    }
  }

  setColorIndex = (colorIndex) => { this.setState(({filter: prevFilter}) => {return {filter: {...prevFilter, colorIndex}}}) }
  setPreview = (preview) => { this.setState({preview}) }
  setAttributeChange = (att) => { this.setState({attribute: att}) }
  setClickedDownload = (val) => { this.setState({clickedDownload: val}) }
  setAnimating = (val) => { this.setState({animating: val}) }
  setRings = val => { this.setState(({filter: prevFilter}) => {
    return {
      filter: { 
        ...prevFilter,
        data: {
          ...prevFilter.data,
          rings: val
        }
      }
    }
  })}

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
    const { setup } = this.props
    updateContrast(contrastVals.default)
    updateLightness(lightnessVals.default)
    setup()
  }
  getSliderProps = () => {
    const {attribute} = this.state
    const {editing, scale, lightness, contrast} = this.props
    const {filter: {data}} = this.state
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
          onChange: this.setRings
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
      init,
      editing,
      img: { blobUrl, data: imgData }
    } = this.props
    const {attribute, clickedDownload, animating, preview: {length, name}, filter} = this.state
    if (!init) return null
    /* return <Splash /> */
    const navLinksDisabled = !blobUrl
    return (
      <AppContainer editing={editing}>
        <Beforeunload onBeforeunload={() => "Sure you want to leave this site? You will lose your progress"} />
        <MobileHeader
          hide={editing || animating}>
          {blobUrl && !editing && !animating && ([<div key={1} style={{width: 40, height: 40, left: 5, top: 3, position: 'absolute'}} onClick={this.removeImg}><CloseIcon style={{width: 26, height: 26, position: 'absolute', left: 6, top: 6}}  /></div>,
        <div
          key={2}
          style={{position: 'absolute', right: 6, top: 3, height: 40, width: 40}}>
          <DownloadCanvas
            setClickedDownload={this.setClickedDownload}
            clickedDownload={clickedDownload} />
        </div>])
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
                <Size
                  length={length}
                  name={name}
                  disabled={editing || animating}
                  setPreview={this.setPreview} />
              </div>
            </SecondaryActions>
          </DesktopOnly>
          <WorkspaceContainer>
            <Workspace length={length}>
              <Filter
                filter={filter}
                length={length}
                setAnimating={this.setAnimating}
                animating={animating}
                clickedDownload={clickedDownload} />
              <EditPhoto
                length={length}
                updatePhoto={this.updateImage} />
              <Guides />
              <Upload onChange={this.handleFileChange} />
                <SliderContainer>
                  {!animating && <SectionSliderScale
                    disabled={!blobUrl || animating}
                    showBackground={editing}
                    key={editing ? 'scale' : attribute}
                    {...this.getSliderProps()} />}
                </SliderContainer> 
                <div style={{position: 'absolute', visibility: 'hidden', width: '80%', minWidth: 300, bottom: -90, left: '50%', transform: 'translate(-50%)'}}>
                  {/* TODO: use local storage to not show this if they have been here before */}
                  <DemoImage
                    blobUrl={blobUrl}
                    handleFile={this.handleFile} />
                </div>
                <div style={{position: 'absolute', width: '80%', minWidth: 300, bottom: -100, left: '50%', transform: 'translate(-50%)'}}>
                {!editing && !animating && <div style={{fontSize: 10, justifyContent: 'space-evenly', display: 'flex', alignItems: 'center', textTransform: "uppercase", textAlign: 'center'}}>
                  <NavLinks
                    disabled={navLinksDisabled}
                    active={attribute === 'rings' && !editing}
                    onClick={() => {this.setAttributeChange('rings')}}>
                    Rings
                  </NavLinks>
                  <NavLinks
                    disabled={navLinksDisabled}
                    active={attribute === 'scale' || editing} // in editing mode we are always open to scale
                    onClick={() => {this.setAttributeChange('scale')}}>
                    Scale
                  </NavLinks>
                  <NavLinks
                    disabled={navLinksDisabled}
                    active={attribute === 'lightness' && !editing}
                    onClick={() => {this.setAttributeChange('lightness')}}>
                    Lightness
                  </NavLinks>
                  <NavLinks
                    disabled={navLinksDisabled}
                    active={attribute === 'contrast' && !editing}
                    onClick={() => {this.setAttributeChange('contrast')}}>
                    Contrast
                  </NavLinks>
                  </div>}
                </div>
            </Workspace>
          </WorkspaceContainer>
          <DesktopOnly>
            {!editing && !animating && blobUrl && <InvertIcon style={{position: 'absolute', right: 15, top: 15, height: 70, width: 70, borderRadius: '100%'}}>
              <DownloadCanvas
                width={1}
                setClickedDownload={this.setClickedDownload}
                clickedDownload={clickedDownload} />
              </InvertIcon>}
          </DesktopOnly>
        </Main>
        <MobileMargin />
        <Sidebar hide={editing || animating} noImg={!blobUrl}>
          <DesktopOnly>
            <div><Logo style={{width: '100%', fill: '#777'}} /></div>
            <div style={{marginTop: 5, fontSize: 12}}>
              <Link target={'_blank'} as={'a'} href={'https://twitter.com/shalanahfaith'}>©2018 Shalanah Dawson</Link>
            </div>
            <div style={{marginTop: 5, fontSize: 12}}>Downloads free to use for non&#8209;commercial purposes.</div>
          </DesktopOnly>
          {!!imgData && !editing && !animating && <Swatches setColorIndex={this.setColorIndex} filter={filter} />}
          {!blobUrl && <Onboarding />}
        </Sidebar>
      </AppContainer>
    )
  }
}

const mapStateToProps = state => {
  const {
    editing: { editing },
    setup: { init },
    img: { scale, blobUrl, lightness, contrast },
    img,
  } = state
  return { init, scale, img, blobUrl, editing, lightness, contrast }
}
const mapDispatchToProps = dispatch => {
  return {
    setup: () => dispatch(setup()),
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
    clearImg: () => dispatch(clearImg())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
