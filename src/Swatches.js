import React from 'react'
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

class Swatches extends React.PureComponent {
  render () {
    return (
      <Section>
        <SpiralPointsGetter
          {...this.props.img}
          delayUntilMouseUp
          filter={this.props.filter}> 
          {({ points, width, height, scale }) => { 
            return <Container>
              {coloring.map((d, i) => (
                <Swatch
                  setEditingPhoto={this.props.setEditingPhoto}
                  activeIndex={this.props.filter.colorIndex}
                  setColorIndex={this.props.setColorIndex}
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
