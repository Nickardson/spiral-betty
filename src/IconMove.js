import React from 'react'

const IconMove = ({length, ...props, active}) => {
  if (!active) return null
  return (
    <div
      style={{
        borderRadius: '100%',
        backgroundColor: '#efefef',
        width: length,
        height: length
      }}
      {...props}>
      <svg style={{width: '100%', height: '100%'}} viewBox="0 0 100 100">
        <path
          d="M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0ZM37.26,29.26,46.18,16.8s4-6.38,8.53,0l8.48,12.51A2.34,2.34,0,0,1,61.25,33H55V43.28H45.26V33h-6.1A2.34,2.34,0,0,1,37.26,29.26ZM63,70.74,54,83.2s-4,6.38-8.53,0L37,70.69A2.34,2.34,0,0,1,39,67H45.2V56.72h9.74V67h6.11A2.34,2.34,0,0,1,63,70.74ZM83.2,54.62,70.69,63.1A2.34,2.34,0,0,1,67,61.16V54.85H33V61a2.34,2.34,0,0,1-3.7,1.9L16.8,53.94s-6.38-4,0-8.53l12.51-8.48A2.34,2.34,0,0,1,33,38.87v6.24H43.28v.07H67V39.07a2.34,2.34,0,0,1,3.7-1.9L83.2,46.09S89.58,50.05,83.2,54.62Z"
          fill="var(--accent)"
        />
      </svg>
    </div>
  )
}

export default IconMove
