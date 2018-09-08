import React from 'react'
import IconPhotoPlaceholder from './IconPhotoPlaceholder'
import {UploadText} from './Text'

const WorkspaceIconAndText = ({active, text, type = 'placeholder', showText}) => {
  const isPlaceholder = type === 'placeholder'
  const backgroundColor = isPlaceholder ? '' : 'var(--accent)'
  const accent = isPlaceholder ? 'var(--accent)' : '#fff'
  const color = active ? accent : '#999'
  const textTransform = 'uppercase'
  const padding = isPlaceholder ? '' : '6px 10px 5px'
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
          opacity: active || showText ? 1 : 0,
          backgroundColor,
          color,
          textTransform,
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
