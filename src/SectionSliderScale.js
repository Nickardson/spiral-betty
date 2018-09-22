import React, {Fragment} from 'react'
import Slider from './Slider'
import SliderController from './SliderController'
import styled from 'styled-components'

const Icon = styled.div`
  cursor: pointer;
  color: #979797;
  background-color: #fff;
  transition: .2s;
  :hover {
    color: var(--accent);
    background-color: var(--accent);
  }
`
export const InvertIcon = styled(Icon)`
  color: #979797;
  border: 1px solid #979797;
  :hover {
    color: #fff;
    background-color: var(--accent);
    border: 2px solid var(--accent);
  }
`
const Mark = styled.div`
  color: currentColor;
  transition: .3s;
  svg * {
    stroke-width: 5;
    stroke-linejoin: round;
    fill: transparent;
    stroke: currentColor;
    stroke-linecap: round;
  }
  :hover {
    svg * {
      color: #fff;
    }
  }
`

const SectionSliderScale = ({
  min,
  max,
  step,
  editing,
  defaultValue,
  onChange,
  sliderProps,
  disabled,
  showBackground
}) => {
  return (
    <SliderController
      defaultValue={defaultValue}
      onChange={onChange}>
      { ({
          onChange: controllerOnChange,
          value
        }) => (
        <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flex: 1, backgroundColor: showBackground ? '#fff' : '', border: editing ? '1px solid #efefef' : '1px solid transparent', padding: 15, borderRadius: 35}} id={'slider-container'}>
          <div style={{width: 15}}/>
          <Slider
            style={{margin: '6px 0'}}
            disabled={disabled}
            {...sliderProps}
            value={value}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            onChange={controllerOnChange} />
          <div style={{width: 15}}/>
        </div>
        {/* Done btn for scale */}
        {editing && <Fragment><div style={{width: 8}}/>
        <div style={{width: 55}}><Icon style={{width: '100%', borderRadius: '100%', height: 55}}><Mark><svg style={{width: '100%', height: '100%'}} viewBox='0 0 193.3 193.3'><polyline points='46.9 101.4 76.9 131.4 146.4 61.9'/></svg></Mark></Icon></div></Fragment>}
        </div>
        )
      }
    </SliderController>
  )
}

export default SectionSliderScale