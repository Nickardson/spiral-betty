import styled from 'styled-components'

const SectionTitle = styled.h2`
  font-family: Montserrat, sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 11.5px;
  color: #555;
`

const UploadText = styled.h4`
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  line-height: 1;
  font-size: 11.5px;
  color: #555;
`
const P = styled.p`
  line-height: 1.4;
  font-weight: 400;
  font-size: 10px;
`

const Link = styled.span` 
  cursor: pointer;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

export { SectionTitle, UploadText, P, Link }
