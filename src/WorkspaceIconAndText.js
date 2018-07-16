import React from 'react'
import IconPhotoPlaceholder from './IconPhotoPlaceholder'
import IconMove from './IconMove'
import {UploadText} from './Text'

const WorkspaceIconAndText = ({active, text, showIcon = true, type = 'placeholder'}) => {
  const isPlaceholder = type === 'placeholder'
  const backgroundColor = isPlaceholder ? '' : 'var(--accent)'
  const accent = isPlaceholder ? 'var(--accent)' : '#fff'
  const color = active ? accent : '#999'
  const padding = isPlaceholder ? '' : '10px 20px'
  const transform = isPlaceholder ? 'translateY(60px)' : ''
  return <div style={{pointerEvents: 'none'}}>
    {isPlaceholder && <IconPhotoPlaceholder
      length={70}
      className='pos-center'
      active={active} />}
    <div
      className='pos-center'
      style={{marginTop: type === 'placeholder' ? 60 : ''}}>
      <UploadText
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          opacity: active ? 1 : 0,
          backgroundColor,
          transform: active ? 'translateY(0) translateZ(0)' : transform,
          color,
          padding,
          borderRadius: '30px',
          transition: '.23s'
        }}>
        {text}
      </UploadText>
    </div>
  </div>
}

export default WorkspaceIconAndText
