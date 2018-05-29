import React, { Fragment } from 'react'
import SvgDefsGrad from './SvgDefsGrad'

const SpiralCircle = ({
  colorData: {
    colors,
    fill: {type: fillType, attr}
  },
  radius,
  defPrefix,
  ...props
}) => {
  switch (fillType) {
    case 'linear-gradient':
    case 'radial-gradient':
      const gradId = `${defPrefix}-bg-grad`
      return (
        <Fragment>
          <defs>
            <SvgDefsGrad
              type={fillType === 'linear-gradient' ? 'linear' : 'radial'}
              {...(attr || {})}
              colors={colors}
              gradId={gradId} />
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