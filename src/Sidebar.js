import styled from 'styled-components'

export default styled.div`
  flex: 0 0 250px; 
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ccc;
  background-color: #fff;
  height: 100%;
  padding: 20px 15px;
  overflow-x: hidden;
  overflow-y: scroll; /* for iOS momentum scrolling */
  -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
  transition: .5s;
  ${props => props.hide ? `
    transform: translateX(300px);
    opacity: 0
  ` : ''}
  @media only screen and (orientation: portrait), only screen and (max-width: 1000px), only screen and (max-height: 730px) {
    z-index: 100;
    width: 100%;
    bottom: 0;
    flex: 0 0 90px;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 5px;
    overflow-y: hidden;
    overflow-x: scroll;
    background-color: #efefef;
    border-top: 1px solid #ccc;
    transition: .3s;
    ${props => props.hide || props.noImg ? `
      transform: translateY(90px);
      opacity: 0;
    ` : ''}
  }
`