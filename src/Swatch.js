import React, {Component} from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { updateFilter } from './redux/actions'

const Container = styled.div`
  width: 60px;
  height: 60px;
  float: left;
  margin: 0 15px 15px 0;
  border: 1px solid #979797;
  position: relative;
  cursor: pointer;
  transition: .2s;
  &:nth-of-type(even) {
    margin-right: 0px;
  }
  &.active {
    border: 4px solid var(--accent);
  }
`
const Line = styled.div`
  width: 70%;
  height: 70%;
  border: 3px solid red;
  border-radius: 100%;
`

class Swatch extends Component {
  constructor (props) {
    super(props)
    this.onClick = () => {
      const {colorDark, colorLight, updateFilter} = this.props
      updateFilter(colorLight, colorDark)
      document.documentElement.style.setProperty('--accent', colorDark)
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
        <Line className={'pos-center'} style={{borderColor: colorDark.length === 1 ? colorDark[0] : ''}} />
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
    updateFilter: (colorLight, colorDark) => dispatch(updateFilter(undefined, undefined, colorLight, colorDark)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swatch)
