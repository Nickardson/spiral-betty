import React, {Fragment} from 'react'
import styled from 'styled-components'
import CloseIcon from '../CloseIcon'
import DownloadBtn from '../DownloadBtn'
import Logo from '../Logo'

const Container = styled.div`
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
const DownloadBtnContainer = styled.div`
  cursor: pointer;
  transition: .3s;
  position: absolute;
  right: 6px;
  top: 3px;
  height: 40px;
  width: 40px;
  :hover, :active {
    color: var(--accent);
  }
`

const RemoveBtn = styled.div`
  cursor: pointer;
  transition: .3s;
  width: 40px;
  height: 40px;
  left: 5px;
  top: 3px;
  position: absolute;
  :hover, :active {
    color: red;
  }
`

const closeStyles = {
  width: 26,
  height: 26,
  position: 'absolute',
  left: 6,
  top: 6
}

const MobileHeader = ({
  hide,
  showRemoveAndDownloadBtns,
  removeImg,
  download
}) => {
  return <Container hide={hide}>
    {showRemoveAndDownloadBtns && <Fragment>
      <RemoveBtn onClick={removeImg}>
        <CloseIcon style={closeStyles} />
      </RemoveBtn>
      <DownloadBtnContainer>
        <DownloadBtn onClick={download} />
      </DownloadBtnContainer>
    </Fragment>}
    <Logo style={{height: '13px', margin: 'auto'}} />
  </Container>
}

export default MobileHeader