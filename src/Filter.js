import React from 'react'
import SpiralPointsGetter from './SpiralPointsGetter'
import SpiralCanvas from './SpiralCanvas'
import { layout } from './lib/constants'
import chroma from 'chroma-js'

const { coloring } = require('./lib/constants')

class Filter extends React.PureComponent {
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
    const { filter: {name, colorIndex}, img, rings, setEditingPhoto, length, editing, setAnimating, clickedDownload } = this.props
    if (!img || !img.data) return null
    const maxSize = 1500
    switch (name) {
      case 'spiral':
        return (
          <SpiralPointsGetter
            {...img}
            rings={rings} >
            {({ points, width, height, scale }) => {
              return (
                <div>
                  {/* Interactive asset */}
                  <SpiralCanvas
                    setEditingPhoto={setEditingPhoto}
                    onStartAnimation={() => {setAnimating(true)}}
                    onEndAnimation={() => {setAnimating(false)}}
                    animate
                    editing={editing}
                    interactive
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
                    style={{pointerEvents: 'none', zIndex: -1, visibility: 'hidden', transform: 'translateZ(0)'}}
                    colorIndex={colorIndex} />}
                  {/*!animating &&
                    <Overlay>
                      <WorkspaceIconAndText
                        active
                        text={`Click to crop`}
                        type="move" />
                    </Overlay>
                  */}
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

export default Filter
