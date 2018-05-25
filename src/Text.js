import styled from 'styled-components'

const SectionTitle = styled.h2`
  font-family: Nunito, sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 13.5px;
  letter-spacing: .05em;
  color: #999;
`

const UploadText = styled.h4`
  font-family: Nunito, sans-serif;
  font-weight: 700;
  letter-spacing: .05em;
  line-height: 1;
  font-size: 12px;
  color: #999;
`

const P = styled.p`
  line-height: 1.4;
  font-weight: 400;
  font-size: 13px;
`
// TODO: also make for a tag
const Link = styled.span` 
  font-weight: 700;
  letter-spacing: .05em;
  color: var(--accent);
`

export { SectionTitle, UploadText, P, Link }
