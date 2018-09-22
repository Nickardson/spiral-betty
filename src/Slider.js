import React, { Component } from 'react'
import styled from 'styled-components'

const sliderThumbSize = '12px'
const trackColor = '#979797'
const initScale = 1.5
const hoverScale = 3
const grabScale = 3

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 12px 0 0;
  line-height: 0;
`

// used http://danielstern.ca/range.css/ as a starting pt for cross-browser styles
const SliderInput = styled.input`
  ${props => (props.disabled ? 'pointer-events: none;' : '')}
  /* For ms */
  color: ${props => (props.disabled ? 'rgb(238, 238, 238)' : 'var(--accent)')};
  height: 11px;
  &[type=range] {
    -webkit-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0;
    line-height: 0;
    background-color: transparent;
}
&[type=range]:focus {
  outline: none;
  border: none;
}
/* Webkit */
&[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  width: 100%;
  height: 11px;
  cursor: pointer;
  box-shadow: none;
  background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, ${trackColor} 45.45%, ${trackColor} 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);
  ${props => {
    if (props.disabled) {
      return 'background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, rgb(238, 238, 238) 45.45%, rgb(238, 238, 238) 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);'
    }
  }}
  border-radius: 0px;
}
&[type=range]::-webkit-slider-thumb {
  box-shadow: none;
  border: none;
  transform: scale(${initScale});
  height: ${sliderThumbSize};
  width: ${sliderThumbSize};
  border-radius: 100%;
  background: ${props =>
    props.disabled ? 'rgb(238, 238, 238)' : 'var(--accent)'};
  cursor: grab;
  -webkit-appearance: none;
  margin-top: -1px;
  border: 2px solid transparent;
  transition: background-color .1s, transform .1s, border .4s;
}
/* FF */
&::-moz-focus-outer {
  border: 0;
}
&[type=range]::-moz-range-track {
  width: 100%;
  cursor: pointer;
  box-shadow: none;
  border-radius: 0px;
  height: 11px;
  background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, ${trackColor} 45.45%, ${trackColor} 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);
  ${props => {
    if (props.disabled) {
      return 'background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, rgb(238, 238, 238) 45.45%, rgb(238, 238, 238) 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);'
    }
  }}
}
&[type=range]::-moz-range-thumb {
  box-shadow: none;
  border: none;
  transform: scale(${initScale});
  box-sizing: border-box;
  height: ${sliderThumbSize};
  width: ${sliderThumbSize};
  border-radius: 100%;
  background: ${props =>
    props.disabled ? 'rgb(238, 238, 238)' : 'var(--accent)'};
  border: 2px solid transparent;
  cursor: grab;
  transition: background-color .1s, transform .1s, border .4s;
}
&[type=range]::-ms-track {
  width: 100%;
  height: 11px;
  cursor: pointer;
  border-color: transparent;
  color: transparent;
  background-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, ${trackColor} 45.45%, ${trackColor} 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);
  ${props => {
    if (props.disabled) {
      return 'background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45.44%, rgb(238, 238, 238) 45.45%, rgb(238, 238, 238) 54.54%, rgba(0,0,0,0) 54.55%, rgba(0,0,0,0) 100%);'
    }
  }}
}
&[type=range]::-ms-fill-lower {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
&[type=range]::-ms-fill-upper {
  background: transparent;
  border: none;
  box-shadow: none;
}
&[type=range]::-ms-thumb {
  background-color: currentColor;
  border: none;
  cursor: pointer;
  width: 10px;
  height: 10px;
  transform: scale(${initScale});
}
&[type=range]::-ms-thumb:hover {
  width: 10px;
  height: 10px;
}
&.hover::-webkit-slider-thumb {
  transform: scale(${hoverScale});
  border: 2px solid rgba(255,255,255,.8);
} 
&.hover::-moz-range-thumb {
  transform: scale(${hoverScale});
  border: 2px solid rgba(255,255,255,.8);
} 
&.hover::-ms-thumb {
  transform: scale(1) !important;
  border: none;
  width: 10px;
  height: 10px;
}
&.grabbing.grabbing::-webkit-slider-thumb, &:active::-webkit-slider-thumb {
  cursor: grabbing !important;
  transform: scale(${grabScale});
  border: 2px solid transparent;
}
&.grabbing.grabbing::-moz-range-thumb, &:active::-moz-range-thumb  {
  cursor: grabbing !important;
  transform: scale(${grabScale});
  border: 2px solid transparent;
}
&.grabbing.grabbing::-ms-thumb, &:active::-ms-thumb {
  cursor: grabbing !important;
  transform: scale(1);
  border: none;
}
&.grabbing.grabbing::-webkit-slider-runnable-track, &:active::-webkit-slider-runnable-track {
  cursor: grabbing !important;
}
&.grabbing.grabbing::-moz-range-track, &:active::-moz-range-track {
  cursor: grabbing !important;
}
&.grabbing.grabbing::-ms-track, &:active::-ms-track {
  cursor: grabbing !important;
}
`
const TrackBeforeSlider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  top: 4px;
  transform-origin: 0 0;
  background-color: ${props =>
    props.disabled ? 'rgb(238, 238, 238)' : 'var(--accent)'};
  pointer-events: none;
  transition: background-color 0.15s;
`

// TODO: while dragging keep pointer
class Slider extends Component {
  state = {
    dragging: false,
    hover: false
  }
  dragging = () => {
    this.setState({ dragging: false }, () => {
      document.body.classList.remove('grabbing')
      document.removeEventListener('mouseup', this.dragging)
      document.removeEventListener('touchend', this.dragging)
    })
  }
  onMouseDown = () => {
    this.setState({ dragging: true }, () => {
      document.body.classList.add('grabbing')
      document.addEventListener('mouseup', this.dragging)
      document.addEventListener('touchend', this.dragging)
    })
  }
  onMouseEnter = () => {
    this.setState({ hover: true })
  }
  onMouseLeave = () => {
    this.setState({ hover: false })
  }
  render() {
    const {
      onChange,
      value,
      max,
      min,
      step,
      disabled,
      style = {},
      ...sliderProps
    } = this.props
    const trackBeforeSliderStyle = {
      WebkitTransform: `scaleX(${((value - min) / (max - min))}) translateZ(0)`,
      transform: `scaleX(${((value - min) / (max - min))}) translateZ(0)`
    }
    let className = ''
    if (this.state.dragging) className = 'grabbing'
    else if (this.state.hover) className = 'hover'
    return (
      <SliderContainer style={style}>
        <SliderInput
          {...sliderProps}
          disabled={disabled}
          className={className}
          onMouseDown={this.onMouseDown}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onTouchStart={this.onMouseDown}
          type={'range'}
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          onChange={onChange} />
        <TrackBeforeSlider
          disabled={disabled}
          style={trackBeforeSliderStyle} />
      </SliderContainer>
    )
  }
}

export default Slider
