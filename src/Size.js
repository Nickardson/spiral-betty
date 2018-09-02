import React, {Component} from 'react'
import Section from './Section'
import { SectionTitle } from './Text'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {updatePreview} from './redux/actions'

const sizes = [
  {length: this.originalSize, retina: 1, name: 'Fit to screen'},
  {length: 168, name: 'Facebook'},
  {length: 200, name: 'Twitter'},
  {length: 614, name: 'Instagram'},
]

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
  state = {
    open: false,
    hover: false
  }
  onMouseEnter = () => {this.setState({hover: true})}
  onMouseLeave = () => {this.setState({hover: false})}
  findFit = () => {
    const main = document.getElementById('main').getBoundingClientRect()
    return Math.min(main.width - 20, main.height - 150)
  }
  outSideClick = () => {
    this.setState({open: false})
    document.removeEventListener('mouseup', this.outSideClick)
  }
  onClick = () => {
    this.setState({open: !this.state.open})
    document.addEventListener('mouseup', this.outSideClick)
  }
  onResize = () => {
    const l = this.findFit()
    const {name, length, updatePreview} = this.props
    if (sizes[0].name === name && l !== length) updatePreview(this.findFit(), sizes[0].name)
  }
  componentDidMount () {
    // setup store
    const {updatePreview} = this.props
    updatePreview(this.findFit(), sizes[0].name)
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
  render () {
    const {updatePreview, name: currentName, disabled} = this.props
    return (
      <Section style={{pointerEvents: disabled ? 'none' : '', opacity: disabled ? .15 : 1}}>
        <DD>
          <Btn
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.onMouseEnter}
            onClick={this.onClick}> 
            <SectionTitle style={{marginBottom: 0}}>
              Preview
              <span
                style={{
                  float: 'right',
                  color: disabled ? '#777' : 'var(--accent)',
                  textTransform: 'none',
                }}>
                {currentName}
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
                    onClick={() => {
                      updatePreview(i !== 0 ? length : this.findFit(), name)}
                    }>
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
  const {preview: {length, name}} = state
  return {length, name}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePreview: (length, name) => dispatch(updatePreview(length, name))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Size)