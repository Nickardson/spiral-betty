import React, {Component} from 'react'
import { connect } from 'react-redux'
import  {Button} from './Button'

const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

class DownloadSvg extends Component {
  onClick () {
    const canvas = document.getElementById(spiralCanvas)
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
    const {editing, imgData, animating} = this.props
    const disabled = !imgData
    if (editing || animating) return null
    return (
      <Button disabled={disabled} onClick={this.onClick}>Download</Button>
    )
  }
}

const mapStateToProps = (state) => {
  const {editing: {editing}, img: {data: imgData}, temp: {animating}} = state
  return {editing, imgData, animating}
}
export default connect(
  mapStateToProps
)(DownloadSvg)