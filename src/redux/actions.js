// Editing
const startEditingPhoto = () => ({
  type: 'START_EDITING_PHOTO'
})
const endEditingPhoto = () => ({
  type: 'END_EDITING_PHOTO'
})

// Preview
const updatePreview = (length, name) => ({
  type: 'UPDATE_PREVIEW',
  length,
  name
})

// Img
const updateContrast = (contrast) => ({
  type: 'UPDATE_IMG_CONTRAST',
  contrast
})
const updateLightness = (lightness) => ({
  type: 'UPDATE_IMG_LIGHTNESS',
  lightness
})
const clearImg = () => ({
  type: 'CLEAR_IMG'
})
const addImgData = (blobUrl, contrast, lightness, scale, width, height, data, orientation, name) => ({
  type: 'ADD_IMG_DATA',
  blobUrl,
  contrast,
  scale,
  width,
  height,
  data,
  orientation,
  name,
  lightness
})
const updateImgPos = (scale, cx, cy) => ({
  type: 'UPDATE_IMG_POSITION',
  scale,
  cx,
  cy
})

// Setup
const setup = () => ({
  type: 'STORE_INIT',
})

export {
  startEditingPhoto,
  endEditingPhoto,
  updatePreview,
  updateContrast,
  updateLightness,
  addImgData,
  updateImgPos,
  setup,
  clearImg
}