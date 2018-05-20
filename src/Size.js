import React, {Component} from 'react'
import Section from './Section'
import { SectionTitle } from './Text'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {updatePreviewLength} from './redux/actions'

const DD = styled.div`
  position: relative;
  z-index: 10000;
`

const Btn = styled.button`
  padding: 0;
  text-align: left;
  width: 100%;
  height: 100%
  cursor: pointer;
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
  transition: .2s ease-in-out;
  &.hover {
    border-left: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent);
  }
`
const Drawer = styled.div`
  position: absolute;
  background-color: #fff;
  right: 0;
  top: 35px;
  width: 100%;
  border: 1px solid #aaa;
  transition: .15s ease-in-out;
`
const Li = styled.li`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  cursor: pointer;
  color: #999;
  padding: 17px 13px;
  white-space: nowrap;
  border-bottom: 1px solid #efefef;
  transition: .2s;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    color: var(--accent);
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
    this.outSideClick = () => {
      console.log('here')
      this.setState({open: false})
      document.removeEventListener('mouseup', this.outSideClick)
    }
    this.onClick = () => {
      this.setState({open: !this.state.open})
      document.addEventListener('mouseup', this.outSideClick)
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
      <Section>
        <DD>
          <Btn
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.onMouseEnter}
            onClick={this.onClick}> 
            <SectionTitle style={{marginBottom: 0}}>
              Size
              <span
                style={{
                  float: 'right',
                  color: 'var(--accent)',
                  textTransform: 'none',
                }}>
                {'Fit to screen'}
                <Arrow className={this.state.hover ? 'hover' : ''} />
              </span>
            </SectionTitle>
          </Btn>
          <Drawer
            style={{
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
      </Section>
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