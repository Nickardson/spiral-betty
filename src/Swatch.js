import React, {Component} from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { updateFilter } from './redux/actions'

const Container = styled.div`
  width: 70px;
  height: 70px;
  display: inline-block;
  border-radius: 5px;
  margin: 0 5px 5px 0;
  border: 2px solid rgba(0,0,0,.1);
  position: relative;
  cursor: pointer;
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
    }
  }
  render () {
    const {colorDark, colorLight} = this.props
    return (
      <Container
        onClick={this.onClick}
        style={{background: colorLight.length === 1 ? colorLight[0] : ''}}>
        <Line className={'pos-center'} style={{borderColor: colorDark.length === 1 ? colorDark[0] : ''}} />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (colorLight, colorDark) => dispatch(updateFilter(undefined, undefined, colorLight, colorDark)),
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(Swatch)
