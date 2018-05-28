import React, {Component} from 'react'
import styled from 'styled-components'
import SpiralIcon from './SpiralIcon'

import chroma from 'chroma-js'

import { connect } from 'react-redux'
import { updateFilter } from './redux/actions'

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
  findDarkestColor (colors) {
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
    const {index, updateFilter, dark} = this.props
    updateFilter(index)
    // Find darkest color in set

    document.documentElement.style.setProperty('--accent', this.findDarkestColor(dark.colors))
  }
  render () {
    const {dark, light, fill, index, colorIndex} = this.props
    const activeClass = colorIndex === index ? 'active' : ''
    return (
      <Container onClick={this.onClick} className={activeClass}>
        <SpiralIcon dark={dark} light={light} fill={fill} index={index} />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {filter: {colorIndex}} = state
  return {colorIndex}
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
