import {Component} from 'react'

class SliderController extends Component {
  state = {
    value: this.props.defaultValue
  }
  onChange = (e) => {
    const value = Number(e.target.value)
    this.setState({value}, this.props.onChange(value))
  } 
  render () {
    const {children} = this.props 
    const {value} = this.state
    return (
      children({
        onChange: this.onChange,
        value
      })
    )
  }
}

export default SliderController

