import styled from 'styled-components'

export default styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  z-index: 100;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    height: initial;
    flex: 4;
  }
`