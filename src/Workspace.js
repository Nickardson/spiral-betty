import React from 'react'
import { connect } from 'react-redux'

const Workspace = ({children, length}) => (
  <div 
    style={{
      margin: 'auto',
      position: 'relative',
      width: length,
      height: length,
      transition: '.2s'
    }}>
    {children}
  </div>
)


const mapStateToProps = (state) => {
  const {preview: {length}} = state
  return {
    length
  }
}
export default connect(
  mapStateToProps
)(Workspace)
