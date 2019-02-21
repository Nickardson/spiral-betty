import React from 'react'
import {InvertIcon} from '../SectionSliderScale'
import DesktopOnly from './DesktopOnly'
import DownloadBtn from '../DownloadBtn'

const iconStyle = {
  position: 'absolute',
  right: 15,
  top: 15,
  height: 70,
  width: 70,
  borderRadius: '100%'
}

const DesktopDownloadBtn = ({
  onClick,
  show
}) => {
  return <DesktopOnly>
    {show && <InvertIcon style={iconStyle}>
      <DownloadBtn width={1} onClick={onClick} />
      </InvertIcon>}
  </DesktopOnly>
}

export default DesktopDownloadBtn