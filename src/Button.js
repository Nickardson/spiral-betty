import styled from 'styled-components'

const Button = styled.button`
  padding: 8px 17px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 11px;
  border-radius: 46px;
  cursor: pointer;
  border: none;
  transition: .2s;
  background-color: var(--accent);
  outline: none;
  &:hover, &:active {
    background-color: #222;
  }
  &:disabled {
    cursor: default;
    transition: none; 
    background-color: #eee;
  }
`
const SecondaryButton = Button.extend`
  color: #777;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid rgba(0,0,0,.2);
  &:hover, &:active {
    color: var(--accent);
    background-color: transparent;
    border: 1px solid currentColor;
    ${props => props.type === 'error' ? `
      color: #a84343;
    ` : ''}
    ${props => props.type === 'subtle' ? `
      color: var(--accent);
    ` : ''}
  }
`

export {Button, SecondaryButton}