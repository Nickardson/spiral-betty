import React, {Component} from 'react'
import styled from 'styled-components'
import SpiralCanvas from './SpiralCanvas'
import chroma from 'chroma-js'

import { connect } from 'react-redux'
import { updateFilter } from './redux/actions'

const {coloring} = require('./lib/constants')

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  margin: 2px;
  cursor: pointer;
`
const SwatchSize = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 100%;
`

class Swatch extends Component {
  findDarkestColor = () => {
    // const 
    const colors = coloring[this.props.colorIndex].dark.colors
    let darkest
    colors.forEach(({color}) => {
      if (darkest === undefined) darkest = color
      else {
        if (chroma(darkest).luminance() > chroma(color).luminance()) {
          darkest = color
        }
      }
    })
    return darkest
  }
  onClick = () => {
    const {colorIndex, updateFilter} = this.props
    updateFilter(colorIndex)
    // Find darkest color in set
    document.documentElement.style.setProperty('--accent', this.findDarkestColor())
  }
  render () {
    const {colorIndex, activeIndex, width, height, length, scale, points} = this.props
    const highlight = chroma(this.findDarkestColor()).alpha(0.3).css()
    return (
      <Container>
        <SwatchSize onClick={this.onClick}>
          <SpiralCanvas
            active={colorIndex === activeIndex}
            accent={this.findDarkestColor()}
            highlight={highlight}
            length={length}
            points={points}
            colorIndex={colorIndex}
            width={width}
            height={height}
            scale={scale} />
        </SwatchSize>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {filter: {colorIndex}} = state
  return {activeIndex: colorIndex}
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (index) => dispatch(updateFilter(undefined, index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swatch)
