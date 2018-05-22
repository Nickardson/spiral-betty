// Help from: https://stackoverflow.com/questions/13762864/image-dark-light-detection-client-sided-script
const getImageData = (
  imageSrc,
  orientation
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = imageSrc
    img.style.display = 'none'
    document.body.appendChild(img)
    
    img.onload = () => {
      const {width, height} = img
      
      const {width: w, height: h} = findCanvasDim({width, height})
      const flippedLengths = orientFlippedLengths(orientation)
      let canvasW = flippedLengths ? h : w
      let canvasH = flippedLengths ? w : h
      
      // Create canvas
      const canvas = document.createElement('canvas')
      canvas.width = canvasW
      canvas.height = canvasH

      const ctx = canvas.getContext('2d')
      
      applyOrientationToCtx(ctx, orientation, canvasW, canvasH)
      ctx.drawImage(img, 0, 0, w, h)
      
      const data = ctx.getImageData(0, 0, canvasW, canvasH)
      const imgData = data.data
      // remove img
      
      document.body.removeChild(img)
      resolve({imgData, width: canvasW, height: canvasH, status: 'ok'})
    }
    img.onerror = () => {
      resolve({status: 'error'})
    }
  }
)}

// Mutates ctx
// - https://stackoverflow.com/questions/19463126/how-to-draw-photo-with-correct-orientation-in-canvas-after-capture-photo-by-usin?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
const applyOrientationToCtx = (ctx, orientation, width, height) => {  
  switch(orientation) {
    case 2:
      // horizontal flip
      ctx.translate(width, 0)
      ctx.scale(-1, 1)
      break
    case 3:
      // 180° rotate left
      ctx.translate(width, height)
      ctx.rotate(Math.PI)
      break
    case 4:
      // vertical flip
      ctx.translate(0, height)
      ctx.scale(1, -1)
      break
    case 5:
      // vertical flip + 90 rotate right
      ctx.rotate(Math.PI / 2)
      ctx.scale(1, -1)
      break
    case 6:
      // 90° rotate right
      ctx.rotate(Math.PI / 2)
      ctx.translate(0, -width)
      break
    case 7:
      // horizontal flip + 90 rotate right
      ctx.rotate(Math.PI / 2)
      ctx.translate(height, -width)
      ctx.scale(-1, 1)
        break
    case 8:
      // 90° rotate left
      ctx.rotate(-0.5 * Math.PI)
      ctx.translate(-height, 0)
      break
    default:
      break
  }
}

const findCanvasDim = ({width, height}) => {
  const shortSideMin = 800 // makes sure we don't keep too much data
  if (width < height) {
    return {
      width: shortSideMin,
      height: Math.round(shortSideMin * height / width)
    }
  } else {
    return {
      height: shortSideMin,
      width: Math.round(shortSideMin * width / height)
    }
  }
}



// Range: 0 to 129.5
// Source explanation: http://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/
// Source: https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast?noredirect=1&lq=1
const contrastVal = (value, contrast) => {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
  return Math.max(Math.min(factor * (value - 128) + 128, 255), 0)
}

const orientTransforms = (orientation) => {
  switch (orientation) {
    case 2:
      return 'matrix(-1, 0, 0, 1, 0, 0)'
    case 3:
      return 'matrix(-1, 0, 0, -1, 0, 0)'
    case 4:
      return 'matrix(1, 0, 0, -1, 0, 0)'
    case 5:
      return 'matrix(0, 1, 1, 0, 0, 0)'
    case 6:
      return 'matrix(0, 1, -1, 0, 0, 0)'
    case 7:
      return 'matrix(0, -1, -1, 0, 0, 0)'
    case 8:
      return 'matrix(0, -1, 1, 0, 0, 0)'
    default: 
      return ''
  }
}
const orientFlippedLengths = (orientation) => {
  return orientation && orientation > 4 ? true : false
}

const blobExifTransform = (orientation) => {
  let transform = orientTransforms(orientation)
  let flippedLengths = orientFlippedLengths(orientation)
  return {
    transform,
    flippedLengths
  }
}

export {getImageData, contrastVal, blobExifTransform}