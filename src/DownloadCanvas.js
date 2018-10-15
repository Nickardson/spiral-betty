import React from 'react'
const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

class DownloadCanvas extends React.PureComponent {
  onClick = () => { this.props.setClickedDownload(true) }
  downloadCanvas = () => {
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
  checkToSeeIfCanvasForDownloadExists = () => {
    if (document.getElementById(spiralCanvas)) {
      this.downloadCanvas()
      window.clearInterval(this.timer)
      this.props.setClickedDownload(false)
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.clickedDownload !== true && this.props.clickedDownload === true) {
      this.timer = setInterval(() => {
        this.checkToSeeIfCanvasForDownloadExists()
      }, 100)
      
    }
  }
  render () {
    const {width} = this.props
    const strokeWidth = `${width}px`
    const style = {
      fill: 'none',
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth
    }
    return (
      <svg
        viewBox='0 0 60 60'
        onMouseUp={this.onClick} // TODO: POINTER
        onTouchEnd={this.onClick}
        style={{position: 'relative', width: '100%', height: '100%'}}>
        <g transform='translate(3 3)'>
          <polyline
            points='12 29 12 41 42 41 42 29'
            style={style} />
          <polyline
            points='35 26 27 34 19 26'
            style={style} />
          <line
            x1='27'
            y1='34'
            x2='27'
            y2='11.3'
            style={style} />
        </g>
      </svg>
    )
  }
}

DownloadCanvas.defaultProps = {
  width: 2
}

export default DownloadCanvas