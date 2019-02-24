import React from 'react'

class DownloadBtn extends React.PureComponent {
  render () {
    const {width, onClick} = this.props
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
        onPointerUp={onClick}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
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

DownloadBtn.defaultProps = {
  width: 2
}

export default DownloadBtn