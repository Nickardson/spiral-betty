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
  font-size: 11.5px;
`
// TODO: also make for a tag
const Link = styled.span` 
  font-weight: 700;
  color: var(--accent);
`

export { SectionTitle, UploadText, P, Link }
