import React from 'react'
import {Link} from '../Text'
import Logo from '../Logo'
import DesktopOnly from './DesktopOnly'

const DesktopSidebarLogoAndAuthor = () => {
  return <DesktopOnly>
    <div>
      <Logo style={{width: '100%'}} />
    </div>
    <div
      style={{
        marginTop: 5,
        fontSize: 12
      }}>
      <Link
        target={'_blank'}
        as={'a'}
        href={'https://twitter.com/shalanahfaith'}>
        ©2018 Shalanah Dawson
      </Link>
    </div>
    <div
      style={{
        marginTop: 5,
        fontSize: 12
      }}>
      Downloads free to use for non&#8209;commercial purposes.
    </div>
  </DesktopOnly>
}

export default DesktopSidebarLogoAndAuthor