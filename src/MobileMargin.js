import styled from 'styled-components'

export default styled.div`
  display: none;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    display: flex;
  }
`