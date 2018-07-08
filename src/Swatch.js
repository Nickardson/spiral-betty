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
  justify-content: center;
  margin: 5px;
  cursor: pointer;
`
const SwatchOutline = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 100%;
  transition: .2s;
  border: 1px solid #979797;
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
    const highlight = chroma(this.findDarkestColor()).alpha(0.3).css()
    return (
      <Container onClick={this.onClick}>
        <SwatchOutline className={activeClass}>
        <SpiralCanvas
          accent={this.findDarkestColor()}
          highlight={highlight}
          length={length}
          points={points}
          colorIndex={colorIndex}
          width={width}
          height={height}
          scale={scale} />
          </SwatchOutline>
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
