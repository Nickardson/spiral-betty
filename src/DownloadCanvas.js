import React from 'react'
import FileSaver from 'file-saver'
const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

class DownloadCanvas extends React.PureComponent {
  onClick = () => {
    this.props.setClickedDownload(true)
  }
  downloadCanvas = () => {
    console.log('here')
    const canvas = document.getElementById(spiralCanvas)
    canvas.toBlob(function(blob) {
      const dt = new Date()
      FileSaver.saveAs(blob, `spiralbetty_${dt.getTime()}.jpg`)
    }, 'image/jpeg', 0.95)
    this.props.setClickedDownload(false)
  }
  checkToSeeIfCanvasForDownloadExists = () => {
    if (document.getElementById(spiralCanvas)) {
      this.downloadCanvas()
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.download !== false && prevProps.clickedDownload !== true && this.props.clickedDownload === true) {
      this.checkToSeeIfCanvasForDownloadExists()
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
        touch-action={'none'}
        viewBox='0 0 60 60'
        onPointerUp={this.onClick}
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