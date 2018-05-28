import React from 'react'

const SvgDefsLinearGrad = ({colors, gradId, type, ...props}) => {
  const Tag = type === 'linear' ? 'linearGradient' : 'radialGradient'
  return (
    <Tag id={gradId} {...props}>
      {colors.map(({color, offset}, i) => {
        return (
          <stop
            key={i}
            offset={`${offset}%`}
            stopColor={color} />
        )
      })}
    </Tag>
  )
}

export default SvgDefsLinearGrad