import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import './App.css'

import Upload from './Upload'
import Canvas from './Canvas'
import Guides from './Guides'
import EditPhoto from './EditPhoto'
import Sidebar from './Sidebar'
import Swatch from './Swatch'
import Filter from './Filter'
import DownloadSvg from './DownloadSvg'
import Slider from './Slider'
import { SectionTitle } from './Text'
import Section from './Section'

import {addFilter, setup, updatePreviewLength, updateImgPos, updateFilter, startEditingPhoto, updateContrast, endEditingPhoto, addImgData} from './redux/actions'
import {getImageData} from './lib/img'
import styled from 'styled-components'
const {layout: {sidebar: {width}}} = require('./lib/constants')

const Main = styled.div`
  position: absolute;
  height: 100%;
  overflow: auto;
  left: ${width}px;
  width: calc(100% - ${width}px);
`

const coloring = [
  {
    name: 'Slumber',
    light: ['#00e5c8'],
    dark: ['#851f73'],
    type: 'flat'
  }, {
    name: 'Classic',
    light: ['#fff'],
    dark: ['#000'],
    type: 'flat'
  }, {
    name: 'Hipster',
    light: ['#ff4137'],
    dark: ['#ff4137'],
    type: 'flat'
  }, {
    name: 'Goldy',
    light: ['#f3dd6d'],
    dark: ['#810065'],
    type: 'flat'
  }, {
    name: 'Iredesent',
    light: ['#00fcff'],
    dark: ['#0028e6'],
    type: 'flat'
  }
]

const gradientMapColors = [
  ['#fff', '#000'],
  ['#ff4137', '#1c3c63'],
  ['#f3dd6d', '#810065'],
  ['#00fcff', '#0028e6'],
  ['#00e5c8', '#851f73'],
  ['#88dbdf', '#981012'],
  ['#fef08d', '#037a44'],
  ['#43fd90', '#05407a'],
  ['#fff809', '#dc51d2'],
  ['#90d3ca', '#513750'],
  ['#ff6436', '#1e3265'],
  ['#f03061', '#2e3060'],
  ['#9defe1', '#e72b3c'],
  ['#fff639', '#4a1bcd']
]

const rings = {
  default: 50,
  min: 8,
  max: 180
}

const contrastVals = {
  default: 0,
  min: -75,
  max: 75,
  step: 1
}

class App extends Component {
  constructor () {
    super()
    this.handleRingChange = (val) => {
      this.props.updateRings(val)
    }
    this.handleScaleChange = (scale) => {
      const {img: {scale: prevScale, cx: prevCx, cy: prevCy, width, height}, updateImgPos} = this.props
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
        if (prevCx < minCx) { cx = minCx }   
        if (prevCx > maxCx) { cx = maxCx }
        if (prevCy < minCy) { cy = minCy }
        if (prevCy > maxCy) { cy = maxCy }

        updateImgPos(scale, cx, cy)
      }
    }
    this.handleContrastChange = (val) => {
      const {updateContrast} = this.props
      updateContrast(val)
    }
    this.updateImage = (updates) => {
      const {scale, cx, cy} = updates
      const {updateImgPos, endEditingPhoto} = this.props
      updateImgPos(scale, cx, cy)
      endEditingPhoto()
    }
    this.handleFileChange = (e) => { this._handleFileChange(e) }
  }
  _handleFileChange (e) {
    // TODO: get exif orientation!!!
    const file = e.target.files[0]
    if (!file || !file.name) return
    
    // Make sure this is a png, gif, or jpg (more filetypes?)
    const allowedFileExt = ['png', 'gif', 'jpg', 'jpeg']
    const ext = file.name.split('.').slice(-1)[0].toLowerCase()
    if (
      allowedFileExt.indexOf(ext) !== -1 && 
      file.type.indexOf('image/') !== -1
    ) {
      const blobUrl = URL.createObjectURL(file)
      // TODO: get img data for 2x the size of the spiral length
      getImageData(blobUrl).then(({status, width, height, imgData: data}) => {
        if (status === 'ok') { 
          this.props.startEditingPhoto()
          this.props.addImgData(blobUrl, contrastVals.default, 1, width, height, data)
        } else {
          // TODO: error with img have a warning of some sort
        }
      })
    } else {
      // TODO: will need to give a warning if not supported
    }
  }
  componentWillMount () {
    // setup store
    const {addFilter, setup, updatePreviewLength} = this.props
    addFilter()
    updatePreviewLength(1000)
    setup()
  }
  render() {
    const {init, updatePreviewLength, length, scale} = this.props
    if (!init) return null
    return (
      <Fragment>
        <Main
          style={{
            paddingLeft: '300px',
            minWidth: length + 100,
            minHeight: length + 100,
            overflow: 'hidden'
          }}> 
          <Canvas>
            <Filter />
            <EditPhoto updatePhoto={this.updateImage} />
            <Guides />
            <Upload onChange={this.handleFileChange} />
          </Canvas>
        </Main>
        <Sidebar> 
          <Fragment>
            <Section>
              <SectionTitle>Colors</SectionTitle>
              <div>
                {coloring.map(({light, dark}, i) => (
                  <Swatch
                    key={i}
                    colorLight={light}
                    colorDark={dark} />
                ))}
              </div>
            </Section>
            <Section>
              <SectionTitle>Scale</SectionTitle>
              <Slider
                min={1}
                max={4}
                step={.05}
                value={scale || 1}
                defaultValue={scale || 1}
                onChange={this.handleScaleChange} />
            </Section>
            <Section>
              <SectionTitle>Rings</SectionTitle>
              <Slider
                min={rings.min}
                max={rings.max}
                step={1}
                defaultValue={rings.default}
                onChange={this.handleRingChange} />
            </Section>
            <Section>
              <SectionTitle>Contrast</SectionTitle>
              <Slider
                startCenter
                min={contrastVals.min}
                max={contrastVals.max}
                step={contrastVals.step}
                defaultValue={contrastVals.default}
                onChange={this.handleContrastChange} />
            </Section>
            <Section>
              <SectionTitle>Brightness</SectionTitle>
              <Slider
                startCenter
                min={contrastVals.min}
                max={contrastVals.max}
                step={contrastVals.step}
                defaultValue={contrastVals.default}
                onChange={this.handleContrastChange} />
            </Section>
            <Section>
              <SectionTitle>Preview size</SectionTitle>
              <button onClick={() => {updatePreviewLength(168)}}>FB</button>
              <button onClick={() => {updatePreviewLength(200)}}>Twitter</button>
              <button onClick={() => {updatePreviewLength(614)}}>Instagram</button>
              <span>Custom</span>
            </Section>
          </Fragment>
        </Sidebar>
        <div>
          <DownloadSvg />
        </div>
      </Fragment> 
    )
  }
}

const mapStateToProps = (state) => {
  const {setup: {init}, preview: {length}, img: {scale}, img} = state
  return {init, length, scale, img}
}
const mapDispatchToProps = (dispatch) => {
  return {
    addFilter: () => dispatch(addFilter('spiral', {rings: rings.default}, ['#fff'], ['#000'])),
    setup: () => dispatch(setup()),
    updatePreviewLength: (length) => dispatch(updatePreviewLength(length)),
    updateRings: (rings) => dispatch(updateFilter(undefined, {rings})),
    startEditingPhoto: () => dispatch(startEditingPhoto()),
    endEditingPhoto: () => dispatch(endEditingPhoto()),
    addImgData: (blobUrl, contrast, scale, width, height, data) => dispatch(addImgData(blobUrl, contrast, scale, width, height, data)),
    updateImgPos: (scale, cx, cy) => dispatch(updateImgPos(scale, cx, cy)),
    updateContrast: (contrast) => dispatch(updateContrast(contrast))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
