import React, {Component} from 'react'
import Section from './Section'
import { P, Link } from './Text'

class DemoImage extends Component {
  getDemoImg = () => {
    const {handleFile} = this.props
    const url = document.location.href + 'assets/imgs/nancy-hime.jpg'
    fetch(url)
      .then(res => res.blob()) 
      .then(blob => {
        // Would create blobUrl if cross-browser if this is cross-origin
        handleFile(url, blob)
      })
  }
  render () {
    if (!!this.props.blobUrl) return null
    return (
      <Section style={{
        margin: '20px 0px 0px',
        cursor: 'pointer'
        }}>
        <P
          id={'try-demo-image'}
          style={{textAlign: 'center'}}
          onClick={this.getDemoImg}>
          Not sure what image to use?<br /><Link>Try a demo image</Link>
        </P>
      </Section>
    )
  }
}

export default DemoImage