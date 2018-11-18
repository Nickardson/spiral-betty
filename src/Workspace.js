import React from 'react'

class Workspace extends React.PureComponent {
  render () {
    const {children, length, editing} = this.props
    return (
      <div 
        style={{
          backgroundColor: editing ? 'transparent' : '#fff',
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
