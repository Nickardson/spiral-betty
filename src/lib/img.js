// Help from: https://stackoverflow.com/questions/13762864/image-dark-light-detection-client-sided-script
const getImageData = (
  imageSrc
) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.src = imageSrc
    img.style.display = 'none'
    document.body.appendChild(img)

    img.onload = () => {
      const {width, height} = img
      
      const {width: canvasW, height: canvasH} = findCanvasDim({width, height})
      // Create canvas
      const canvas = document.createElement('canvas')
      canvas.width = canvasW
      canvas.height = canvasH

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvasW, canvasH)

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

const findCanvasDim = ({width, height}) => {
  const shortSideMin = 800 // makes sure we don't keep too much data
  if (width < height && width > shortSideMin) {
    return {
      width: shortSideMin,
      height: Math.round(shortSideMin * height / width)
    }
  } else if (height <= width && height > shortSideMin) {
    return {
      height: shortSideMin,
      width: Math.round(shortSideMin * width / height)
    }
  } else {
    return {
      width, height // same as start
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

export {getImageData, contrastVal}