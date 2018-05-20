import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  height: 46px;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 800;
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

export default Button