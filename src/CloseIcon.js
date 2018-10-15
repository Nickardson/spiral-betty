import styled from 'styled-components'
import {SecondaryButton} from './Button'

export default styled.div`
  width: 100%;
  height: 100%;    
  position: relative;
  
  &::after, &::before{
      position:absolute;
      left:0;
      top: calc(50% - .5px);
      content:'';
      display:block;
      width:100%;
      height:1px;
      background-color: currentColor;
      transform-origin: center;
  }
  &::after {
      transform: rotate(45deg);
  }
  &::before {
      transform: rotate(-45deg);
  }
  ${SecondaryButton}:hover &::after, ${SecondaryButton}:hover &::before {
    top: calc(50% - 1px);
    height: 2px;
  }
`