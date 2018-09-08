import React, { Component, Fragment } from 'react'
import SpiralPointsGetter from './SpiralPointsGetter'
import SpiralCanvas from './SpiralCanvas'
import { connect } from 'react-redux'
import { layout } from './lib/constants'
import chroma from 'chroma-js'
import WorkspaceIconAndText from './WorkspaceIconAndText'
import {addTempProp} from './redux/actions'

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
    const { name, length, colorIndex, imgData, editing, setAnimationValue, animating } = this.props
    if (!imgData) return null
    const maxSize = 2000
    switch (name) {
      case 'spiral':
        return (
          <SpiralPointsGetter>
            {({ points, invertPoints, width, height, scale }) => {
              return (
                <div>
                  {/* Interactive asset */}
                  <SpiralCanvas
                    onStartAnimation={() => {setAnimationValue(true)}}
                    onEndAnimation={() => {setAnimationValue(false)}}
                    animate
                    editing={editing}
                    interactive
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    width={width}
                    height={height}
                    scale={scale}
                    points={coloring[colorIndex].fill.invert ? invertPoints : points}
                    length={Math.min(length, maxSize)}
                    colorIndex={colorIndex}
                  />
                  {/* Downloading asset */}
                  <SpiralCanvas
                    id={layout.ids.spiralCanvas}
                    width={width}
                    height={height}
                    scale={scale}
                    points={coloring[colorIndex].fill.invert ? invertPoints : points}
                    length={maxSize}
                    style={{position: 'absolute', zIndex: -1}}
                    colorIndex={colorIndex}
                  />
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
    filter: { name, colorIndex },
    preview: { length },
    img: { data: imgData },
    temp: {animating}
  } = state
  return { name, length, colorIndex, imgData, 
    editing, animating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAnimationValue: (value) => dispatch(addTempProp('animating', value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
