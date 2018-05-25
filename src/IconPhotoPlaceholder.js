import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  border: none;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
  padding: 0;
  background-clip: padding-box;
`
const Border = styled.div`
  transition: .2s;
  border: 2px solid #ccc;
  border-radius: 100%;
  &.active {
    border: 3px solid var(--accent);
  }
`
const Sky = styled.div`
  border-radius: 100%;
  transform: translateZ(0);
  transition: .2s;
`
const Mountain1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: .2s;
  transform: translateX(3%) translateZ(0);
`
const Mountain2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: .2s;
  transform: scale(1.4) translateX(2%) translateZ(0);
`
const Mountain = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  background-color: rgb(239, 239, 239);
  border-radius: 10%;
`
const Sun = styled.div`
  position: absolute;
  left: 66%;
  top: 25%;
  width: 13.5%;
  height: 13.5%;
  border-radius: 100%;
  background-color: #efefef;
`

const IconPhotoPlaceholder = ({active, length, style = {}, ...props}) => {
  const activeClass = `${active ? 'active' : ''}`
  const transform1 = 'scaleX(.85) rotate(45deg) translateZ(0)'
  const transform2 = 'scaleX(.85) rotate(45deg) translateZ(0)'
  const transform3 = 'scaleX(.85) rotate(45deg) translateZ(0)'
  return (
    <div
      style={{
        width: length,
        height: length,
        ...style
      }} {...props}>
        <Icon className={activeClass}>
          <Sky
            className={`pos-full`}
            style={{backgroundColor:  active ? 'var(--accent)' : '#ccc'}} />
          <Mountain1>
            <Mountain
              style={{
                right: '5%',
                bottom: '-21%',
                WebkitTransform: transform1,
                transform: transform1
              }}
              />
          </Mountain1>
          <Mountain2>
            <Mountain
              style={{
                bottom: '-12%',
                left: '10%',
                WebkitTransform: transform2,
                transform: transform2
              }}
              />
            <Mountain
              style={{
                bottom: '-30%',
                left: '25.5%',
                WebkitTransform: transform3,
                transform: transform3
              }}
              />
          </Mountain2>
          <Sun />
          <Border className={`pos-full ${activeClass}`} />
        </Icon>
    </div>
  )
}

export default IconPhotoPlaceholder