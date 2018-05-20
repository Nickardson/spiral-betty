// Editing
const startEditingPhoto = () => ({
  type: 'START_EDITING_PHOTO'
})
const endEditingPhoto = () => ({
  type: 'END_EDITING_PHOTO'
})

// Preview
const updatePreviewLength = (length) => ({
  type: 'UPDATE_PREVIEW_LENGTH',
  length
})

// Img
const updateContrast = (contrast) => ({
  type: 'UPDATE_IMG_CONTRAST',
  contrast
})
const addImgData = (blobUrl, contrast, scale, width, height, data, orientation, name) => ({
  type: 'ADD_IMG_DATA',
  blobUrl,
  contrast,
  scale,
  width,
  height,
  data,
  orientation,
  name
})
const updateImgPos = (scale, cx, cy) => ({
  type: 'UPDATE_IMG_POSITION',
  scale,
  cx,
  cy
})

// Filter
const addFilter = (name, data, colorLight, colorDark, fill, invert) => ({
  type: 'ADD_FILTER',
  name,
  data,
  colorLight,
  colorDark,
  fill,
  invert
})
const updateFilter = (name, data, colorLight, colorDark, fill, invert) => ({
  type: 'UPDATE_FILTER',
  name,
  data,
  colorLight,
  colorDark,
  fill,
  invert
})

// Setup
const setup = () => ({
  type: 'STORE_INIT',
})


export {
  startEditingPhoto,
  endEditingPhoto,
  updatePreviewLength,
  updateContrast,
  addImgData,
  updateImgPos,
  addFilter,
  updateFilter,
  setup
}