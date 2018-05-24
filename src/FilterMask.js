import React, {PureComponent} from 'react'
import SpiralMask from './SpiralMask'
import { connect } from 'react-redux'

class Filter extends PureComponent {
  render () {
    const {name} = this.props
    switch (name) {
      case 'spiral':
        return (
          <SpiralMask />
        )
      default:
        return null
    }
  }
}

const mapStateToProps = (state) => {
  const {filter: {name}} = state
  return {name}
}

export default connect(
  mapStateToProps
)(Filter)

