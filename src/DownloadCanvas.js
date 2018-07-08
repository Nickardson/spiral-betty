import React, {Component} from 'react'
import { connect } from 'react-redux'
import  {Button} from './Button'

const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

class DownloadSvg extends Component {
  onClick () {
    const canvas = document.getElementById(spiralCanvas)
    // Issues with downloading large canvas: https://stackoverflow.com/questions/37135417/download-canvas-as-png-in-fabric-js-giving-network-error
    canvas.toBlob(function(blob) {
      const href = URL.createObjectURL(blob)
      const dt = new Date();
      var downloadLink = document.createElement("a")
      downloadLink.href = href   
      downloadLink.download = `spiralbetty_${dt.getTime()}.jpg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(href)
    }, 'image/jpeg', 0.95)
  }
  render () {
    const {editing, imgData} = this.props
    const disabled = !imgData || editing
    return (
      <div><Button disabled={disabled} onClick={this.onClick}>Download</Button></div>
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