// TODO: tests
const img = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_IMG_CONTRAST':
      return {
        ...state,
        contrast: action.contrast
      }
    case 'ADD_IMG_DATA':
      // Start fresh
      return {
        blobUrl: action.blobUrl, // TODO: will need to revoke if there was a previous img
        contrast: action.contrast, // TODO: get from a default
        scale: action.scale, // TODO: get from a default
        width: action.width, // full size img does not change
        height: action.height, // full size img does not change
        data: action.data,
        cx: action.width / 2,
        cy: action.height / 2
      }  
    case 'UPDATE_IMG_POSITION':
      return {
        ...state,
        // Cannot be zero
        scale: action.scale || state.scale, 
        // Can be zero
        cx: action.cx !== undefined ? action.cx : state.cx,
        cy: action.cy !== undefined ? action.cy : state.cy
      }
    default:
      return state
  }
}

export default img
