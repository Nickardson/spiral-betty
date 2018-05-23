import React from 'react'
import { SectionTitle } from './Text'
import Section from './Section'
import Slider from './Slider'
import SliderController from './SliderController'
import styled from 'styled-components'

const Value = styled.span`
  text-align: right;
  color: var(--accent);
  float: right;
`
const SliderValue = ({ children }) => ( <Value>{children}</Value> )

const SectionSlider = ({
  title,
  min,
  max,
  step,
  defaultValue,
  onChange,
  startCenter,
  onValueChange
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
        <Section>
          <SectionTitle>{title} <SliderValue>
            {onValueChange ? onValueChange(value) : value}
            </SliderValue>
          </SectionTitle>
          <Slider
            value={value}
            startCenter={startCenter}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            onChange={controllerOnChange} />
        </Section>
        )
      }
    </SliderController>
  )
}

export default SectionSlider