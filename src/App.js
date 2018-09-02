import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import './App.css'

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
import { scaleInputId } from './lib/constants'
import { getImageData } from './lib/img'
import styled from 'styled-components'
import { SecondaryButton } from './Button';

const Main = styled.div`
  flex: 1;
  order: 0;
  height: 100%;
  position: relative;
  z-index: 100;
`

const Sidebar = styled.div`
  flex: 0 0 250px; 
  order: 1;
  border-left: 1px solid #ccc;
  background-color: #fff;
  height: 100%;
  padding: 20px 15px;
  overflow-y: auto; 
`
const Drawer = styled.div`
  height: 200px
`

const rings = {
  default: 40,
  min: 6,
  max: 160,
  step: 1
}
const Link = styled.a`
  text-decoration: none;
  color: var(--accent);
`

const NavLinks = styled.span`
  transition: .2s;
  font-weight: 800;
  cursor: pointer;
  color: #ccc;
  padding: 5px 10px;
  border-radius: 50px;
  :hover {
    color: #444;
    background-color: #efefef;
    scale: 1.1;
  }
  ${props => props.active ? `
    color: var(--accent) !important;
    background-color: transparent !important;
  ` : ''}
`


const contrastVals = {
  default: 0,
  min: -100,
  max: 100,
  step: 1
}

const lightnessVals = {
  default: 0,
  min: -50,
  max: 50,
  step: 1
}

const attributes = {
  scale: {
    name: 'Scale'
  },
  rings: {
    name: 'Rings'
  },
  lightness: {
    name: 'Lightness'
  },
  contrast: {
    name: 'Contrast'
  },
  zoom: {
    name: 'Zoom'
  }
}

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
  clearImg = () => {
    window.URL.revokeObjectURL(this.props.blobUrl)
    this.props.clearImg()
  }
  handleFile = (url, file, revokeUrl) => {
    // TODO: get img data for 2x the size of the spiral length
    this.getOrientation(file, orientation => {
      getImageData(url, orientation).then(
        ({ status, width, height, imgData: data }) => {
          if (status === 'ok') {
            const { startEditingPhoto, addImgData, addTempProp } = this.props
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
            // TODO: error with img have a warning of some sort
            console.error(
              'Something has gone terribly wrong we need to add an warning'
            )
          }
        }
      )
    })
  }
  handleFileChange = e => {
    const file = e.target.files[0]
    if (!file || !file.name) return
    if (file.type.indexOf('image/') !== -1) {
      const blobUrl = URL.createObjectURL(file)
      const {blobUrl: revokeUrl} = this.props
      this.handleFile(blobUrl, file, revokeUrl)
    } else {
      // TODO: will need to give a warning if not supported
    }
    // Now clear out file...
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
    updateContrast(contrastVals.default),
    updateLightness(lightnessVals.default)
    addTempProp('attribute', 'rings')
    setup()
  }
  getSliderProps = () => {
    const {blobUrl, attribute, editing, animating, scale, lightness, contrast, data} = this.props
    let attr = editing ? 'scale' : attribute
    if (!blobUrl) return {}
    switch (attr) {
      case 'scale':
        return {
          editing: editing,
          disabled: animating,
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
          disabled: editing || animating,
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
      length,
      clearImg,
      scale,
      addTempProp,
      editing,
      animating,
      img: { blobUrl, data: imgData }
    } = this.props
    if (!init) return null
    return (
      <div style={{display: 'flex', width: '100%', height: '100vh', overflow: 'hidden'}}>
        <Main id='main'>
          <div style={{display: 'flex', height: 'calc(100% - 100px)'}}>
          <Workspace>
            <Filter />
            <EditPhoto updatePhoto={this.updateImage} />
            <Guides />
            <Upload onChange={this.handleFileChange} />
              <div style={{position: 'absolute', width: '80%', minWidth: 200, bottom: -65, left: '50%', transform: 'translate(-50%)'}}>
              {blobUrl && !animating && <SectionSliderScale key={editing ? 'scale' : attribute} {...this.getSliderProps()} />}
              </div> 
              <div style={{position: 'absolute', width: '80%', minWidth: 200, bottom: -100, left: '50%', transform: 'translate(-50%)'}}>
              {blobUrl && !editing && !animating && <div style={{fontSize: 10, justifyContent: 'space-evenly', display: 'flex', alignItems: 'center', textTransform: "uppercase", textAlign: 'center'}}>
                <NavLinks active={attribute === 'rings' && !editing} onClick={() => {addTempProp('attribute', 'rings')}}>Rings</NavLinks>
                <NavLinks active={attribute === 'scale' || editing} onClick={() => {addTempProp('attribute', 'scale')}}>Scale</NavLinks>
                <NavLinks active={attribute === 'lightness' && !editing} onClick={() => addTempProp('attribute', 'lightness')}>Lightness</NavLinks>
                <NavLinks active={attribute === 'contrast' && !editing} onClick={() => addTempProp('attribute', 'contrast')}>Contrast</NavLinks>
                </div>}
              </div>
          </Workspace>
          </div>
        </Main>
        <Sidebar>
          <Logo style={{width: '100%', fill: '#777'}} />
          <div style={{marginTop: 5, fontSize: 9}}><Link href={'https://twitter.com/shalanahfaith'}>©2018 Shalanah Dawson</Link></div>
          <div style={{marginTop: 5, fontSize: 9}}>Free to use for non-commercial purposes.</div>
          {!!imgData && !editing && !animating && <Swatches />}
        </Sidebar>
        <div
          style={{
            display: 'none',
            visibility: editing || animating ? 'hidden' : '',
            flex: '0 0 310px',
            order: 0,
            top: '0',
            zIndex: 1,
            backgroundColor: '#fff',
            height: '100%',
            padding: '40px'
          }}>
          {blobUrl && !animating && !editing && <SecondaryButton onClick={clearImg}>
            <span>&times;</span> Remove image
          </SecondaryButton>}
          <Size disabled={editing || animating} />
          <DownloadCanvas />
          <DemoImage blobUrl={blobUrl} handleFile={this.handleFile} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    editing: { editing },
    setup: { init },
    preview: { length },
    img: { scale, blobUrl, lightness, contrast },
    img,
    filter: {data},
    temp: {animating, attribute}
  } = state
  return { init, length, scale, img, blobUrl, editing, animating, attribute, lightness, contrast, data }
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
