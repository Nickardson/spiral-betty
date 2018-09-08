import React, { Component } from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import Swatch from './Swatch'
import SpiralPointsGetter from './SpiralPointsGetter'
import styled from 'styled-components'
const {coloring} = require('./lib/constants')

const Container = styled.div`
  display: flex;
  margin-top: 15px; 
  flex-wrap: wrap;
  align-items: center;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    margin-top: 0;
    flex-wrap: nowrap;
  }
`

class Swatches extends Component {
  render () {
    return (
      <Section>
        <SpiralPointsGetter delayUntilMouseUp>
          {({ points, width, height, scale }) => {
            return <Container>
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
              </Container>
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
