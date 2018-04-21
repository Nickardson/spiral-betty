import React, {Component} from 'react'
import styled from 'styled-components'

const sliderThumbSize = '12px'
const trackColor = '#979797'

// used http://danielstern.ca/range.css/ as a starting pt for cross-browser styles
const SliderInput = styled.input`
  &[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 0;
}
&[type=range]:focus {
  outline: none;
  border: none;
}
&[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  box-shadow: none;
  background: ${trackColor};
  border-radius: 0px;
  border: none;
}
&[type=range]::-webkit-slider-thumb {
  box-shadow: none;
  border: none;
  height: ${sliderThumbSize};
  width: ${sliderThumbSize};
  border-radius: 100%;
  background: var(--accent);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5.5px;
  transition: background-color .15s;
}
&::-moz-focus-outer {
  border: 0;
}
&[type=range]::-moz-range-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  box-shadow: none;
  background: ${trackColor};
  border-radius: 0px;
  border: none;
}
&[type=range]::-moz-range-thumb {
  box-shadow: none;
  border: none;
  height: ${sliderThumbSize};
  width: ${sliderThumbSize};
  border-radius: 100%;
  background: var(--accent);
  cursor: pointer;
  transition: background-color .15s;
}
&[type=range]::-ms-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
&[type=range]::-ms-fill-lower {
  background: #2b6699;
  border: none;
  border-radius: 0px;
  box-shadow: none;
}
&[type=range]::-ms-fill-upper {
  background: ${trackColor};
  border: none;
  border-radius: 0px;
  box-shadow: none;
}
&[type=range]::-ms-thumb {
  box-shadow: none;
  border: none;
  height: ${sliderThumbSize};
  width: ${sliderThumbSize};
  border-radius: 100%;
  background: var(--accent);
  cursor: pointer;
  height: 1px;
  transition: background-color .15s;
}
&[type=range]:focus::-ms-fill-lower {
  background: ${trackColor};
}
`
const TrackBeforeSlider = styled.div`
  position: absolute;
  width: 100%;
  height: 3px;
  top: 5.5px; // FF
  background-color: var(--accent);
  pointer-events: none;
  transition: background-color .15s;
  
  // Safari && Chrome
  &:not(*:root) {
    top: 3.3px;
  }
`

// TODO: while dragging keep pointer
class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = {value: this.props.defaultValue}
    this.onChange = (e) => {
      const value = Number(e.target.value)
      console.log(value)
      this.setState({value})
      this.props.onChange(value)
    } 
  }
  render () {
    const {min, max, step, startCenter} = this.props
    const {value} = this.state
    let trackBeforeSliderStyle = {}
    if (startCenter) {
      // is this to the right or left of slider?
      let midPt = (max + min) / 2
      let pastCenter = value > midPt
      trackBeforeSliderStyle = {
        [pastCenter ? 'left' : 'right']: '50%',
        width: Math.abs((value - midPt) / (max - min)) * 100 + '%'
      }
    } else {
      trackBeforeSliderStyle = {
        width: `${(value - min) / (max - min) * 100}%`
      }
    }
    return (
      <div style={{position: 'relative', width: '100%', height: 'auto', padding: 0, margin: '12px 0 0', lineHeight: 0}}>
        <SliderInput
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          onChange={this.onChange} />
        <TrackBeforeSlider
          style={trackBeforeSliderStyle} />
      </div>
    )
  }
}

export default Slider
