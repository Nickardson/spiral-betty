import styled from 'styled-components'

export default styled.div`
  display: none;
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    display: flex;
    flex: 0 0 45px;
    height: 45px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    border-bottom: 1px solid #efefef;
    transition: .2s;
    ${props => props.hide ? `
      transform: translateY(-35px);
      opacity: 0;
    ` : ''}
  }
`