import React, { Fragment } from 'react'

const SpiralCircle = ({
  colorData: {
    colors,
    fill: {type: fillType}
  },
  radius,
  defPrefix,
  ...props
}) => {
  switch (fillType) {
    case 'linear-gradient':
      const gradId = `${defPrefix}-bg-grad`
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
          <circle
            {...props}
            r={radius}
            cx={radius}
            cy={radius}
            fill={`url(#${gradId})`} />
        </Fragment>
      )
    case 'flood':
    default:
      return (
        <circle
          {...props}
          r={radius}
          cx={radius}
          cy={radius}
          fill={colors[0].color} />
      )
  }
}

export default SpiralCircle