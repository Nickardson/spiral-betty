import styled from 'styled-components'

export default styled.span`
  transition: background-color .2s, color .2s;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  color: #ccc;
  padding: 5px 10px;
  border-radius: 50px;
  :hover {
    color: #fff;
    background-color: var(--accent);
    scale: 1.1;
  }
  ${props => props.active ? `
    color: var(--accent) !important;
    background-color: transparent !important;
  ` : ''}
  ${props => props.disabled ? `
    color: #ddd !important;
    background-color: transparent !important;
    pointer: none;
    pointer-events: none;
  ` : ''}
`