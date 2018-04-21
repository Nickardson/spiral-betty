import React, {Component} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const {layout: {ids: {spiralSvg}}} = require('./lib/constants')

const Download = styled.button`
  width: 189px;
  height: 46px;
  color: #fff;
  position: fixed;
  right: 25px;
  top: 25px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 15.5px;
  border-radius: 46px;
  cursor: pointer;
  border: none;
  transition: .2s;
  background-color: var(--accent);
  &:not(:disabled):hover {
  }
  &:disabled {
    cursor: default;
    background-color: #eee;
  }
`

class DownloadSvg extends Component {
  onClick () {
    const svg = document.getElementById(spiralSvg)
    
    // Clone so we can start stripping stuff
    var _svg = svg.cloneNode(true)
    _svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    
    // Remove all style tag from svg...
    _svg.removeAttribute("style")
    _svg.removeAttribute("class")
    // TODO: possibly remove more not needed styles from svg made for interactions

    // Time
    const dt = new Date();
    const month = dt.getUTCMonth() + 1 //months from 1-12
    const day = dt.getUTCDate()
    const year = dt.getUTCFullYear()
    const secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours())
    const newdate = `${year}-${month}-${day}_${secs}`
    
    // Source: https://stackoverflow.com/a/23218877
    const svgData = _svg.outerHTML
    var preface = '<?xml version="1.0" encoding="utf-8"?>\r\n'
    var svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"})
    var svgUrl = URL.createObjectURL(svgBlob)
    var downloadLink = document.createElement("a")
    downloadLink.href = svgUrl    
    downloadLink.download = `spiralbetty_${newdate}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

  }
  render () {
    const {editing, imgData} = this.props
    const disabled = !imgData || editing
    return (
      <Download disabled={disabled} onClick={this.onClick}>Download</Download>
    )
  }
}

const mapStateToProps = (state) => {
  const {editing: {editing}, img: {data: imgData}} = state
  return {editing, imgData}
}
export default connect(
  mapStateToProps
)(DownloadSvg)