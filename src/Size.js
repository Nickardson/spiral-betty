import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {updatePreviewLength} from './redux/actions'

const DD = styled.div`
  margin-right: 20px;
  height: 46px;
  position: relative;
  display: inline-block;
  text-align: center;
`

const Btn = styled.button`
  padding: 0;
  width: 100%;
  height: 100%
  font-weight: 800;
  color: #AEAEAE;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  letter-spacing: .2px;
  border: none;
  transition: .2s;
  background-color: transparent;
  outline: none;
`
const Arrow = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  margin-top: -10px;
  transform-origin: center;
  transform: rotate(-45deg);
  border: 1px solid #979797;
  border-right: none;
  border-top: none;
  display: inline-block;
  margin-left: 10px;
  top: -2px;
  transition: .4s ease-in-out;
  &.hover {
    border-left: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent);
  }
`
const Drawer = styled.div`
  position: absolute;
  background-color: #fff;
  right: 0;
  top: 46px;
  width: 100%;
  border: 1px solid #aaa;
  transition: .15s ease-in-out;
`
const Li = styled.li`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  color: #999;
  padding: 17px 13px;
  white-space: nowrap;
  border-bottom: 1px solid #efefef;
  &:last-of-type {
    border-bottom: none;
  }
`

class Size extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      hover: false
    }
    this.onMouseEnter = () => {this.setState({hover: true})}
    this.onMouseLeave = () => {this.setState({hover: false})}
    this.onClick = () => {
      this.setState({open: !this.state.open})
    }
    this.originalSize
  }
  componentDidMount () {
    // setup store
    const width = window.innerWidth
    const height = window.innerHeight
    const sidebar = document.getElementById('sidebar').getBoundingClientRect().width
    const {updatePreviewLength} = this.props
    this.originalSize = Math.min(width - sidebar - 100, height - 100)
    updatePreviewLength(this.originalSize)
  }
  render () {
    const {updatePreviewLength, length} = this.props
    // TODO: add icons... hold this info elsewhere and add original size
    const sizes = [
      {length: this.originalSize, retina: 1, name: 'Fit to screen'},
      {length: 168, retina: 2, name: 'Facebook Profile'},
      {length: 200, retina: 2, name: 'Twitter Profile'},
      {length: 614, retina: 2, name: 'Instagram Post'},
    ]
    const types = ['svg', 'jpg']
    return (
      <Fragment>
      <DD>
        <Btn
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          onClick={this.onClick}> 
            Size:
            <span
              style={{
                color: 'var(--accent)',
                textTransform: 'none',
                marginLeft: 6
              }}>
              {`${length || 0}`}&#215;{`${length || 0}`}
            </span>
            <Arrow className={this.state.hover ? 'hover' : ''} />
        </Btn>
        <Drawer
          style={{
            width: 200,
            pointerEvents: this.state.open ? 'all' : 'none',
            opacity: this.state.open ? '1' : '0',
            transform: this.state.open ? '' : 'translateY(-20px)'
          }}>
          <ul>
            {sizes.map(({length, name}, i) => {
              return (
                <Li 
                  key={i}
                  onClick={() => {updatePreviewLength(length)}}>
                  {name}
                </Li>
              )
            })}
          </ul>
        </Drawer>
      </DD>
      <DD style={{width: 140}}>
        <Btn
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          onClick={this.onClick}>
            Filetype:
            <span
              style={{
                color: 'var(--accent)',
                marginLeft: 6
              }}>
              svg
            </span>
            <Arrow className={this.state.hover ? 'hover' : ''} />
        </Btn>
        <Drawer
          style={{
            pointerEvents: this.state.open ? 'all' : 'none',
            opacity: this.state.open ? '1' : '0',
            transform: this.state.open ? '' : 'translateY(-20px)'
          }}>
          <ul>
            {types.map((name) => {
              return (
                <Li key={name}>
                  {name}
                </Li>
              )
            })}
          </ul>
        </Drawer>
      </DD>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const {preview: {length}} = state
  return {length}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePreviewLength: (length) => dispatch(updatePreviewLength(length))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Size)