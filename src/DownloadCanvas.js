// import React from 'react'
// import FileSaver from 'file-saver'
// import DownloadBtn from './DownloadBtn'
// const {layout: {ids: {spiralCanvas}}} = require('./lib/constants')

// class DownloadCanvas extends React.PureComponent {
//   onClick = () => {
//     this.props.setClickedDownload(true)
//   }
//   downloadCanvas = () => {
//     const canvas = document.getElementById(spiralCanvas)
//     canvas.toBlob(function(blob) {
//       const dt = new Date()
//       FileSaver.saveAs(blob, `spiralbetty_${dt.getTime()}.jpg`)
//     }, 'image/jpeg', 0.95)
//     this.props.setClickedDownload(false)
//   }
//   checkToSeeIfCanvasForDownloadExists = () => {
//     if (document.getElementById(spiralCanvas)) {
//       this.downloadCanvas()
//     }
//   }
//   componentDidUpdate (prevProps) {
//     if (this.props.download !== false && prevProps.clickedDownload !== true && this.props.clickedDownload === true) {
//       this.checkToSeeIfCanvasForDownloadExists()
//     }
//   }
//   render () {
//     return null
//     return (
//       <DownloadBtn
//         onClick={this.onClick}
//         width={this.props.width} />
//     )
//   }
// }

// export default DownloadCanvas