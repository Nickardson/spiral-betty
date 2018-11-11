import React, { Component } from 'react'
import './App.css'
import Beforeunload from 'react-beforeunload'
import { blobExifTransform } from './lib/img'

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

import { scaleInputId, rings, lightnessVals, contrastVals, sizes } from './lib/constants'
import { getImageData } from './lib/img'

class App extends Component {
  state = {
    sliderActive: false,
    winHeight: 0, // default till update
    editing: false, // cropping
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
    },
    img: {} // not set yet
  }

  ios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  setSliderActive = val => {this.setState({sliderActive: val})}
  setEditingPhoto = val => { this.setState({editing: val}) }
  setColorIndex = colorIndex => { this.setState(({filter: prevFilter}) => {return {filter: {...prevFilter, colorIndex}}}) }
  setPreview = preview => { this.setState({preview}) }
  setAttributeChange = att => { this.setState({attribute: att}) }
  setClickedDownload = val => { this.setState({clickedDownload: val}) }
  setAnimating = val => { this.setState({animating: val}) }
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
  setImgData = ({
    data,
    blobUrl,
    contrast,
    lightness,
    scale,
    width,
    height,
    orientation,
    name
  }) => {
    this.setState({
      img: {
        blobUrl,
        contrast,
        lightness,
        scale,
        width,
        height,
        data,
        name,
        orientation: (orientation !== undefined && orientation > 0)
          ? orientation
          : 1,
        cx: width / 2,
        cy: height / 2
      }
    })
  }
  setImgPos = ({scale, cx, cy}) => {
    this.setState(({img: prevImg}) => {
      let updatePos = {}
      if (scale !== undefined) updatePos.scale = scale
      if (cx !== undefined) updatePos.cx = cx
      if (cy !== undefined) updatePos.cy = cy
      return {
        img: {
          ...prevImg,
          ...updatePos
        }
      }
    })
  }
  setContrast = (contrast) => {
    this.setState(({img: prevImg}) => {
      return {
        img: {
          ...prevImg,
          contrast
        }
      }
    })
  }
  setScale = (scale) => {
    this.setState(({img: prevImg}) => {
      return {
        img: {
          ...prevImg,
          scale
        }
      }
    })
  }
  setLightness = (lightness) => {
    this.setState(({img: prevImg}) => {
      return {
        img: {
          ...prevImg,
          lightness
        }
      }
    })
  }
  clearImg = () => { this.setState({img: {}}) }

  handleScaleChange = scale => {
    let { img: { scale: prevScale, cx: prevCx, cy: prevCy, width, height } } = this.state
    prevScale = prevScale === undefined || 1
    if (prevScale <= scale) {
      // Increasing in scale, we're good to go and update
      this.setScale(scale)
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
      if (prevCx < minCx) cx = minCx
      if (prevCx > maxCx) cx = maxCx
      if (prevCy < minCy) cy = minCy
      if (prevCy > maxCy) cy = maxCy

      this.setImgPos({scale, cx, cy})
    }
  }
  updateImage = updates => {
    const { scale, cx, cy, endEditing } = updates
    this.setImgPos({scale, cx, cy})
    if (endEditing) this.setEditingPhoto(false)
  }
  removeImg = () => {
    const val = window.confirm('Are you sure you want to remove this image?')
    if (val) {
      window.URL.revokeObjectURL(this.props.blobUrl)
      this.clearImg()
    }
  }
  handleFile = (url, file, revokeUrl) => {
    // TODO: get img data for 2x the size of the spiral length
    this.getOrientation(file, orientation => {
      getImageData(url, orientation).then(
        ({ status, width, height, imgData: data }) => {
          if (status === 'ok') {
            if (revokeUrl) window.URL.revokeObjectURL(revokeUrl) // we have had some success... now time to revoke old url
            this.setEditingPhoto(true)
            this.setImgData({
              blobUrl: url,
              contrast: contrastVals.default,
              lightness: lightnessVals.default,
              scale: 1,
              width,
              height,
              data,
              orientation: orientation || 1,
              name: file.name
            })
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
  getOrientation (file, callback) {
    // TODO: move to img utils
    // Source: https://stackoverflow.com/a/32490603/2824643
    var reader = new FileReader()
    reader.onload = function(e) {
      var view = new DataView(e.target.result)
      if (view.getUint16(0, false) !== 0xffd8) return callback(-2)
      const length = view.byteLength
      let offset = 2
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) return callback(-1)
        const marker = view.getUint16(offset, false)
        offset += 2
        if (marker === 0xffe1) {
          if (view.getUint32((offset += 2), false) !== 0x45786966) return callback(-1)

          const little = view.getUint16((offset += 6), false) === 0x4949
          offset += view.getUint32(offset + 4, little)
          const tags = view.getUint16(offset, little)
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
  getSliderProps = () => {
    const {filter: {data}, editing, img: {scale, lightness, contrast}, attribute} = this.state
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
          step: data.rings < 50 ? rings.step : 5,
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
          defaultValue: lightness || lightnessVals.default,
          onChange: this.setLightness
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
          defaultValue: contrast || contrastVals.default,
          onChange: this.setContrast
        }
      default:
        return {}
    }
  }

  setWinSize = () => {
    this.setState({winHeight: window.innerHeight})
  }
  componentDidMount () {
    this.setWinSize()
    document.addEventListener('resize', this.setWinSize)
  }
  componentWillUnmount () {
    document.removeEventListener('resize', this.setWinSize)
  }
  render() {
    const {sliderActive, attribute, clickedDownload, animating, preview: {length, name}, filter, editing, img: { blobUrl, data }, img, winHeight} = this.state
    if (winHeight === 0) return null
    const {data: {rings}} = filter
    // if (length === 0) return null
    /* return <Splash /> */

    const navLinksDisabled = !blobUrl
    return (
      <AppContainer editing={editing} style={{height: winHeight}}>
        <Beforeunload onBeforeunload={() => "Sure you want to leave this site? You will lose your progress"} />
        <MobileHeader
          hide={editing || animating}>
          {blobUrl && !editing && !animating && ([
          <div
            key={1}
            style={{width: 40, height: 40, left: 5, top: 3, position: 'absolute'}}
            onClick={this.removeImg}>
            <CloseIcon
              style={{width: 26, height: 26, position: 'absolute', left: 6, top: 6}}  />
          </div>,
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
        <MobileMargin style={{flex: `0 0 ${winHeight * .05}px`}} />
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
              {!editing && <Filter
                img={img}
                filter={filter}
                setEditingPhoto={this.setEditingPhoto}
                editing={editing}
                rings={rings}
                length={length}
                setAnimating={this.setAnimating}
                clickedDownload={clickedDownload} />}
              <EditPhoto
                {...blobExifTransform((img && img.orientation) || 1, this.ios)}
                {...img}
                active={editing}
                length={length}
                updatePhoto={this.updateImage} />
              <Guides active={editing} />
              <Upload
                blobUrl={img && img.blobUrl}
                onChange={this.handleFileChange} />
                <SliderContainer>
                  {!animating && <SectionSliderScale
                    disabled={!blobUrl || animating}
                    showBackground={editing}
                    onDragStart={() => {this.setSliderActive(true)}}
                    onDragEnd={() => {this.setSliderActive(false)}}
                    key={editing ? 'scale' : attribute}
                    {...this.getSliderProps()} />}
                </SliderContainer> 
                <div style={{position: 'absolute', visibility: 'hidden', width: '80%', minWidth: 300, bottom: -90, left: '50%', transform: 'translate(-50%)'}}>
                  {/* TODO: use local storage to not show this if they have been here before */}
                  <DemoImage
                    blobUrl={blobUrl}
                    handleFile={this.handleFile} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    width: '80%',
                    minWidth: 300,
                    bottom: -100,
                    left: '50%',
                    transform: 'translate(-50%)'
                  }}>
                {!editing && !animating && <div
                  style={{
                    fontSize: 10,
                    justifyContent: 'space-evenly',
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: "uppercase",
                    textAlign: 'center'
                  }}>
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
            {!editing && !animating && blobUrl && <InvertIcon
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
                height: 70,
                width: 70,
                borderRadius: '100%'
              }}>
              <DownloadCanvas
                width={1}
                setClickedDownload={this.setClickedDownload}
                clickedDownload={clickedDownload} />
              </InvertIcon>}
          </DesktopOnly>
        </Main>
        <MobileMargin />
        <Sidebar
          hide={editing || animating}
          noImg={!blobUrl}>
          <DesktopOnly>
            <div>
              <Logo style={{width: '100%', fill: '#777'}} />
            </div>
            <div style={{marginTop: 5, fontSize: 12}}>
              <Link
                target={'_blank'}
                as={'a'}
                href={'https://twitter.com/shalanahfaith'}>
                ©2018 Shalanah Dawson
              </Link>
            </div>
            <div style={{marginTop: 5, fontSize: 12}}>
              Downloads free to use for non&#8209;commercial purposes.
            </div>
          </DesktopOnly>
          {!!data && !editing && !animating && <Swatches
            {...img}
            attribute={attribute}
            colorIndex={filter.colorIndex}
            sliderActive={sliderActive}
            setEditingPhoto={this.setEditingPhoto}
            setColorIndex={this.setColorIndex}
          rings={rings} />}
          {!blobUrl && <Onboarding />}
        </Sidebar>
      </AppContainer>
    )
  }
}

export default App
