import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  height: 46px;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 15.5px;
  border-radius: 46px;
  cursor: pointer;
  border: none;
  transition: .2s;
  background-color: var(--accent);
  &:not(:disabled):hover {
  }
  &:disabled {
    cursor: default;
    background-color: #eee;
  }
`
const SecondaryButton = styled.button`
  color: #777;
  font-weight: 700;
  font-size: 11.5px;
  cursor: pointer;
  border: none;
  transition: .2s;
  &:hover {
    color: var(--accent);
  }
`

export {Button, SecondaryButton}