import styled from 'styled-components'

export default styled.div`
  position: absolute;
  width: 80%;
  min-width: 300px;
  bottom: -70px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  @media only screen and (orientation: portrait), (max-width: 1000px) {
    width: 100%;
  }
`