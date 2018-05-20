import React, { Fragment } from 'react'

const SpiralLine = ({
  fill,
  maskId,
  color,
  loops,
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
    case 'dual':
      return (
        <g mask={`url(#${maskId})`}>
          {loops.map((d, i) => {
            const fill = color[i % 2]
            return <path key={i} d={d} fill={fill} />
          })}
        </g>
      )
    case 'flood':
    default:
      return (
        <Fragment>
          {/*<defs>
            <radialGradient id="MyGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="red" />
            <stop offset="60%" stopColor="red" />
            <stop offset="100%" stopColor="violet" />
          </radialGradient>
          </defs>*/}
        
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