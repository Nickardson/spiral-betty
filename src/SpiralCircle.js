import React, { Component, Fragment } from 'react'

const SpiralCircle = ({
  fill,
  color,
  defPrefix,
  ...props
}) => {
  switch (fill) {
    case 'linear-gradient':
      const gradId = `${defPrefix}-bg-grad`
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
          <circle
            {...props}
            fill={`url(#${gradId})`} />
        </Fragment>
      )
    case 'flood':
    default:
      return (
        <circle
          {...props}
          fill={color[0]} />
      )
  }
}

export default SpiralCircle