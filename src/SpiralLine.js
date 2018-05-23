import React, { Fragment } from 'react'

const SpiralLine = ({
  fill,
  maskId,
  color,
  defPrefix
}) => {
  switch (fill) {
    case 'linear-gradient':
      const gradId = `${defPrefix}-line-grad`
      return (
        <Fragment>
          <defs>
            <linearGradient id={gradId}>
              <stop
                offset="0%"
                stopColor={color[0]} />
              <stop
                offset="100%"
                stopColor={color[1]} />
            </linearGradient>
          </defs>
          <rect
            mask={`url(#${maskId})`}
            width={'100%'}
            height={'100%'}
            fill={`url(#${gradId})`} />
        </Fragment>
      )
    case 'flood':
    default:
      return (
        <Fragment>
          <rect
            mask={`url(#${maskId})`}
            width={'100%'}
            height={'100%'}
            fill={color[0]} />
        </Fragment>
      )
  }
}

export default SpiralLine