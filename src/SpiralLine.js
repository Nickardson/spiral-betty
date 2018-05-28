import React, { Fragment } from 'react'
import SvgDefsGrad from './SvgDefsGrad'

const SpiralLine = ({
  maskId,
  defPrefix,
  colorData: {
    colors,
    fill: {type: fillType, attr}
  }
}) => {
  const gradId = `${defPrefix}-line-grad`
  switch (fillType) {
    case 'linear-gradient':
    case 'radial-gradient':
      return (
        <Fragment>
          <defs>
            <SvgDefsGrad
              type={fillType === 'linear-gradient' ? 'linear' : 'radial'}
              {...(attr || {})}
              colors={colors}
              gradId={gradId} />
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