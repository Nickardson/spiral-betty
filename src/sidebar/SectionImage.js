import React from 'react'
import Section from '../Section'
import { SectionTitle } from '../Text'

const SectionImage = ({
  blobUrl,
  handleFile,
  handleFileChange,
  startEditingPhoto,
  name
}) => {
  return (
    <Section style={{paddingBottom: 20}}>
      <SectionTitle>Image <span onClick={blobUrl ? () => {document.getElementById('add-img').click()} : () => {
          const {handleFile} = this
          const url = document.location.href + 'assets/imgs/nancy-hime-12.jpg'
          fetch(url)
            .then(res => res.blob()) 
            .then(blob => {
              // TODO: only make blobUrl if this is cross-origin
              const bUrl = URL.createObjectURL(blob)
              handleFile(bUrl, blob)
            })
          }} style={{float: 'right', textTransform: 'none', fontWeight: 400, cursor: 'pointer', fontSize: 13}}>{blobUrl ? '+ replace photo' : '+ try a demo image'}</span></SectionTitle>
      <label 
        id={'add-img'}
        style={{
          display: !blobUrl ? 'inline-block' : 'none',
          width: 70,
          height: 70,
          marginRight: 10,
          borderRadius: 5,
          cursor: 'pointer',
          position: 'relative',
          border: '1px solid rgba(0, 0, 0, 0.25)',
          backgroundColor: 'rgb(239, 239, 239)'
        }}>
        <input
          style={{
            position: 'absolute',
            left: '100%',
            top: '100%',
            opacity: 0
          }}
          type="file"
          onChange={handleFileChange} />
      </label>   
      {blobUrl && <span style={{
            position: 'relative',
            height: 70,
            display: 'inline-block',
            lineHeight: 0
          }}>
          <img
            onClick={startEditingPhoto}
            src={blobUrl}
            style={{
              cursor: 'pointer',
              width: 'auto',
              height: 70,
              borderRadius: 5,
              border: '1px solid rgba(0, 0, 0, 0.25)',
              backgroundColor: 'rgb(239, 239, 239)',
              overflow: 'hidden'
            }} />
      </span>}
    </Section>
  )
}

export default SectionImage