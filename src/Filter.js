import React, { Component, Fragment } from 'react'
import SpiralPointsGetter from './SpiralPointsGetter'
import SpiralCanvas from './SpiralCanvas'
import { connect } from 'react-redux'
import { layout } from './lib/constants'
import chroma from 'chroma-js'
import WorkspaceIconAndText from './WorkspaceIconAndText'

import { UploadText } from './Text'
const { coloring } = require('./lib/constants')

class Filter extends Component {
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
    const { name, length, colorIndex, imgData } = this.props
    if (!imgData) return null
    const accent = this.findDarkestColor()
    switch (name) {
      case 'spiral':
        return (
          <SpiralPointsGetter>
            {({ points, width, height, scale }) => {
              return (
                <div>
                  <SpiralCanvas
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    id={layout.ids.spiralCanvas}
                    width={width}
                    height={height}
                    scale={scale}
                    points={points}
                    length={length}
                    colorIndex={colorIndex}
                  />
                  <div
                    style={{
                      opacity: this.state.hover ? 1 : 0,
                      //boxShadow: 'inset 0 0 500px var(--accent)',
                      transition: '.2s',
                      border: '3px solid var(--accent)',
                      borderRadius: '100%',
                      pointerEvents: 'none',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: `${chroma(accent)
                        .luminance(0.68)
                        .alpha(0.9)
                        .css()}`
                    }}
                  />
                  {this.state.hover && (
                    <WorkspaceIconAndText
                      active={this.state.hover}
                      text={'Click to move'}
                      type="move" />
                  )}
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
    filter: { name, colorIndex },
    preview: { length },
    img: { data: imgData }
  } = state
  return { name, length, colorIndex, imgData }
}

export default connect(mapStateToProps)(Filter)
