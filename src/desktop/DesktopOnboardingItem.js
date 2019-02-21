import React from 'react'
import styled from 'styled-components'

const boxShadow = '0 1px 3px rgba(0,0,0,.2)'
const Item = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 1.5;
`
const Number = styled.div`
  transform: rotate(-10deg);
  width: 32px;
  height: 32px;
  background-color: var(--accent);
  border-radius: 100%;
  border: 2px solid #fff;
  box-shadow: ${boxShadow};
  bottom: -6px;
  position: absolute;
  left: -12px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  padding-left: 1px;
  padding-top: 1px;
`
const Diagram = styled.div`
  margin: 0 auto;
  position: relative;
  margin-bottom: 15px;
  width: 120px;
  height: 120px;
`
const DesktopOnboardingItem = ({
  alt,
  src,
  imgStyle,
  number,
  imgBoxShadow,
  children
}) => {
  return <Item>
    <Diagram>
      <img
        alt={alt}
        src={src}
        style={{
          transform: 'rotate(5deg)',
          width: '100%',
          height: '100%',
          boxShadow: imgBoxShadow ? boxShadow : '',
          ...imgStyle}} />
      <Number>{number}</Number>
    </Diagram>
    {children}
  </Item>
}

export default DesktopOnboardingItem