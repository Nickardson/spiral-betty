import React, {Component} from 'react'
import styled from 'styled-components'
import SpiralIcon from './SpiralIcon'

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
  constructor (props) {
    super(props)
    this.onClick = () => {
      const {colorDark, colorLight, fill, updateFilter} = this.props
      updateFilter(colorLight, colorDark, fill)
      document.documentElement.style.setProperty('--accent', colorDark[0])
    }
  }
  render () {
    const {colorDark, colorLight, light, dark} = this.props
    const active = `${colorDark}` === `${dark}` && `${colorLight}` === `${light}`
    return (
      <Container
        onClick={this.onClick}
        className={active ? 'active' : ''}
        style={{background: colorLight.length === 1 ? colorLight[0] : ''}}>
        <SpiralIcon fill={colorDark.length === 1 ? colorDark[0] : ''} />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {filter: {colorLight: light, colorDark: dark}} = state
  return {light, dark}
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (colorLight, colorDark, fill) => dispatch(updateFilter(undefined, undefined, colorLight, colorDark, fill)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swatch)
