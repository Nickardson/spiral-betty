import React from 'react'
import { SectionTitle } from './Text'
import Section from './Section'
import Slider from './Slider'
import SliderController from './SliderController'
import styled from 'styled-components'

const Value = styled.span`
  text-align: right;
  color: #999;
  float: right;
`
const SliderValue = ({ style, children }) => ( <Value style={style}>{children}</Value> )

const SectionSliderScale = ({
  title,
  min,
  max,
  step,
  editing,
  defaultValue,
  onChange,
  startCenter,
  onValueChange,
  sliderProps,
  disabled = false
}) => {
  return (
    <SliderController
      startCenter={startCenter}
      defaultValue={defaultValue}
      onChange={onChange}>
      { ({
          onChange: controllerOnChange,
          value
        }) => (
        <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flex: 1, backgroundColor: '#fff', border: editing ? '1px solid #efefef' : '1px solid transparent', padding: 10, borderRadius: 30}}>
          <div style={{width: 15}}/>
          <Slider
            style={{margin: '6px 0'}}
            disabled={disabled}
            {...sliderProps}
            value={value}
            startCenter={startCenter}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            onChange={controllerOnChange} />
          <div style={{width: 15}}/>
        </div>
        <div style={{width: editing ? 45 : 0, transition: '.1s'}}><div style={{width: '100%', borderRadius: '100%', backgroundColor: 'red', height: 45}}/></div>
        </div>
        )
      }
    </SliderController>
  )
}

export default SectionSliderScale