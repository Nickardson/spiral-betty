import React from 'react'
import IconPhotoPlaceholder from './IconPhotoPlaceholder'
import IconMove from './IconMove'
import {UploadText} from './Text'

const WorkspaceIconAndText = ({active, text, showIcon = true, type = 'placeholder'}) => {
  return <div style={{pointerEvents: 'none'}}>
    {type === 'placeholder' && <IconPhotoPlaceholder
      length={70}
      className='pos-center'
      active={active} />}
    {type === 'move' && <IconMove
      length={70}
      className='pos-center'
      active={active} />}
    <div
      className='pos-center'
      style={{marginTop: 60}}>
      <UploadText
        style={{
          textAlign: 'center',
          color: active ? 'var(--accent)' : '#999',
          transition: '.2s'
        }}>
        {text}
      </UploadText>
    </div>
  </div>
}

export default WorkspaceIconAndText
