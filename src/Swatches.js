import React, { Component } from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import Swatch from './Swatch'
import SpiralPointsGetter from './SpiralPointsGetter'
const {coloring} = require('./lib/constants')

class Swatches extends Component {
  render () {
    return (
      <Section>
        <SpiralPointsGetter delayUntilMouseUp>
          {({ points, width, height, scale }) => {
            return <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
              {coloring.map((d, i) => (
                <Swatch
                  points={points}
                  width={width}
                  height={height}
                  scale={scale}
                  length={80}
                  colorIndex={i}
                  key={i}
                />
              ))}
              </div>
            }
          }
        </SpiralPointsGetter>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  const {
    img: { data: imgData }
  } = state
  return { imgData }
}

export default connect(
  mapStateToProps
)(Swatches)
