import React, { PureComponent } from 'react'
import SpiralPointsGetter from './SpiralPointsGetter'
import SpiralCanvas from './SpiralCanvas'
import { connect } from 'react-redux'
import {layout} from './lib/constants'

class Filter extends PureComponent {
  render() {
    const {name, length, colorIndex, imgData} = this.props
    if (!imgData) return null
    switch (name) {
      case 'spiral':
        return (
          <SpiralPointsGetter>
            {({points, width, height, scale}) => {
              return <SpiralCanvas
                id={layout.ids.spiralCanvas}
                width={width}
                height={height}
                scale={scale}
                points={points}
                length={length}
                colorIndex={colorIndex} />
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
