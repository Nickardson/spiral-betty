import styled from 'styled-components'

export default styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.darken ? '#222' : ''};
  transition: color .5s;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px)  {
    flex-direction: column;
  }
`