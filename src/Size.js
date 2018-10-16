import React, {Component} from 'react'
import Section from './Section'
import {SecondaryButton} from './Button'
import styled from 'styled-components'
import {sizes} from './lib/constants'

const DD = styled.div`
  position: relative;
  z-index: 10000;
  @media only screen and (orientation: portrait) {
    display: none;
  }
`
const Btn = styled.div`
  padding: 0;
  text-align: left;
  width: 100%;
  height: 100%
  cursor: pointer;
  border: none;
  transition: .2s;
  outline: none;
`
const Arrow = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
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
const arrowHeight = 12
const Drawer = styled.div`
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 44px;
  border-radius: 20px;
  border: 1px solid #bbb;
  transition: .1s ease-in-out;
  &::before, &::after {
    content: '';
    position: absolute;
    top: -${arrowHeight}px;
    left: 60px;
    width: 0; 
    height: 0; 
    border-left: ${arrowHeight}px solid transparent;
    border-right: ${arrowHeight}px solid transparent;
    border-bottom: ${arrowHeight}px solid #bbb;
  }
  &::after {
    top: ${-arrowHeight + 1}px;
    border-bottom-color: #fff;
  }
`
const Li = styled.li`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  color: #999;
  padding: 17px 25px;
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
    const horizontalPadding = window.innerWidth < 1000 ? 10 : 40
    const verticalPadding = 120 + (window.innerWidth < 1000 ? 10 : 60)
    return Math.min(main.width - horizontalPadding, main.height - verticalPadding)
  }
  outSideClick = () => {
    this.setState({open: false})
    document.removeEventListener('mouseup', this.outSideClick)
  }
  onClick = (e) => {
    this.setState(({open}) => {return {open: !open}})
    document.addEventListener('mouseup', this.outSideClick)
  }
  onResize = () => {
    const length = this.findFit()
    const {name, setPreview} = this.props
    if (sizes[0].name === name) setPreview({length, name})
  }
  componentDidMount () {
    // setup store
    const {setPreview} = this.props
    setPreview({length: this.findFit(), name: sizes[0].name})
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
  render () {
    const {setPreview, name: currentName, disabled} = this.props
    return (
      <Section style={{pointerEvents: disabled ? 'none' : '', opacity: disabled ? .15 : 1}}>
        <DD>
          <Btn
            onMouseLeave={this.onMouseLeave}
            onMouseEnter={this.onMouseEnter}
            onMouseUp={this.onClick}> 
            <SecondaryButton>
              {currentName}
              <Arrow className={this.state.hover ? 'hover' : ''} />
            </SecondaryButton>
          </Btn>
          <Drawer
            style={{
              pointerEvents: this.state.open ? 'all' : 'none',
              opacity: this.state.open ? '1' : '0',
              transform: this.state.open ? '' : 'translateY(-20px)'
            }}>
            <ul>
              {sizes.map(({length, name}, i) => {
                const active = currentName === name
                return (
                  <Li 
                    style={{color: active ? '#222' : ''}}
                    key={i}
                    onClick={() => {setPreview({length: i !== 0 ? length : this.findFit(), name})}}>
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

export default Size