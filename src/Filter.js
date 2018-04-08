import React, {PureComponent, Fragment} from 'react'
import Spiral from './Spiral'
import { connect } from 'react-redux'

class Filter extends PureComponent {
  render () {
    const {thumbnail = false, onClick, name} = this.props
    switch (name) {
      case 'spiral':
        return (
          <Fragment>
            <Spiral />
          </Fragment>
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

