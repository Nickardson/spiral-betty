import React from 'react'
import Section from './Section'
import Swatch from './Swatch'
import SpiralPointsGetter from './SpiralPointsGetter'
import styled from 'styled-components'
const {coloring} = require('../lib/constants')

const Container = styled.div`
  display: flex;
  margin-top: 15px; 
  flex-wrap: wrap;
  align-items: center;
  transform: translateZ(0);
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    margin-top: 0;
    flex-wrap: nowrap;
  }
`

class Swatches extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.sliderActive || (nextProps.attribute !== this.props.attribute)) {
      return false
    }
    return true
  }
  render () {
    const {rings, setEditingPhoto, colorIndex, setColorIndex, attribute, ...img} = this.props
    return (
      <Section>
        <SpiralPointsGetter
          rings={rings}
          colorIndex={colorIndex}
          {...img}> 
          {({ points, width, height, scale }) => { 
            return <Container>
              {coloring.map((d, i) => (
                <Swatch
                  setEditingPhoto={setEditingPhoto}
                  activeIndex={colorIndex}
                  setColorIndex={setColorIndex}
                  points={points}
                  width={width}
                  height={height}
                  scale={scale}
                  length={40}
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

export default Swatches
