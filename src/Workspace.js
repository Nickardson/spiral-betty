import React from 'react'

class Workspace extends React.PureComponent {
  render () {
    const {children, length} = this.props
    return (
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
  }
}

export default Workspace
