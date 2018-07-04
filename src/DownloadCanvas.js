import React, {Component} from 'react'
import { connect } from 'react-redux'
import  {Button} from './Button'

const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

class DownloadSvg extends Component {
  onClick () {
    const canvas = document.getElementById(spiralCanvas)
    const href = canvas.toDataURL('image/jpeg', 1.0)
    const dt = new Date();
    var downloadLink = document.createElement("a")
    downloadLink.href = href   
    downloadLink.download = `spiralbetty_${dt.getTime()}.jpg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
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