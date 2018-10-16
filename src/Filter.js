import React, { Fragment } from 'react'
import SpiralPointsGetter from './SpiralPointsGetter'
import SpiralCanvas from './SpiralCanvas'
import { connect } from 'react-redux'
import { layout } from './lib/constants'
import chroma from 'chroma-js'
import WorkspaceIconAndText from './WorkspaceIconAndText'

const { coloring } = require('./lib/constants')

class Filter extends React.Component {
  state = { hover: false }
  onMouseEnter = () => {
    this.setState({ hover: true })
  }
  onMouseLeave = () => {
    this.setState({ hover: false })
  }
  findDarkestColor = () => {
    // TODO: move
    const colors = coloring[this.props.colorIndex].dark.colors
    let darkest
    colors.forEach(({ color }) => {
      if (darkest === undefined) darkest = color
      else {
        if (chroma(darkest).luminance() > chroma(color).luminance()) {
          darkest = color
        }
      }
    })
    return darkest
  }
  render() {
    const { filter: {name, colorIndex}, filter, length, imgData, editing, animating, setAnimating, clickedDownload } = this.props
    if (!imgData) return null
    const maxSize = 1500
    switch (name) {
      case 'spiral':
        return (
          <SpiralPointsGetter filter={filter}>
            {({ points, width, height, scale }) => {
              return (
                <div>
                  {/* Interactive asset */}
                  <SpiralCanvas
                    onStartAnimation={() => {setAnimating(true)}}
                    onEndAnimation={() => {setAnimating(false)}}
                    animate
                    editing={editing}
                    interactive
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    width={width}
                    height={height}
                    scale={scale}
                    points={points}
                    length={Math.min(length, maxSize)}
                    colorIndex={colorIndex}
                  />
                  {/* Downloading asset */}
                  {clickedDownload && <SpiralCanvas
                    id={layout.ids.spiralCanvas}
                    width={width}
                    height={height}
                    scale={scale}
                    points={points}
                    length={maxSize}
                    style={{position: 'absolute', zIndex: -1}}
                    colorIndex={colorIndex} />}
                  {!animating &&
                    <Fragment>
                      <div
                        style={{
                          opacity: this.state.hover ? 1 : 0,
                          transition: '.2s',
                          border: '3px solid var(--accent)',
                          borderRadius: '100%',
                          pointerEvents: 'none',
                          lineHeight: 0,
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(255,255,255,.3)'
                        }}
                      />
                      <WorkspaceIconAndText
                        active={this.state.hover}
                        text={`Click to crop`}
                        type="move" />
                    </Fragment>
                  }
                </div>
              )
            }}
          </SpiralPointsGetter>
        )
      default:
        return null
    }
  }
}

const mapStateToProps = state => {
  const {
    editing: {editing},
    img: { data: imgData },
  } = state
  return { imgData, editing}
}

export default connect(mapStateToProps)(Filter)
