import React, { Fragment } from 'react'

const SpiralLine = ({
  maskId,
  defPrefix,
  colorData: {
    colors,
    fill: {type: fillType}
  }
}) => {
  switch (fillType) {
    case 'linear-gradient':
      const gradId = `${defPrefix}-line-grad`
      return (
        <Fragment>
          <defs>
            <linearGradient id={gradId}>
              {colors.map(({color, offset}, i) => {
                return (
                  <stop
                    key={i}
                    offset={`${offset}%`}
                    stopColor={color} />
                )
              })}
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
            fill={colors[0].color} />
        </Fragment>
      )
  }
}

export default SpiralLine