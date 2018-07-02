import React, {Component} from 'react'
import styled from 'styled-components'
import SpiralCanvas from './SpiralCanvas'


import chroma from 'chroma-js'

import { connect } from 'react-redux'
import { updateFilter } from './redux/actions'

const {coloring} = require('./lib/constants')

const Container = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  float: left;
  margin: 0 8px 8px 0;
  border: 1px solid #979797;
  position: relative;
  cursor: pointer;
  transition: .2s;
  &:nth-of-type(even) {
    margin-right: 0px;
  }
  &.active {
    border: 3px solid var(--accent);
  }
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
    const activeClass = colorIndex === activeIndex ? 'active' : ''
    return (
      <Container
        onClick={this.onClick}
        className={activeClass}>
        <SpiralCanvas
          length={length}
          points={points}
          colorIndex={colorIndex}
          width={width}
          height={height}
          scale={scale} />
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
