// TODO: tests
const filter = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        name: action.name,
        data: action.data || {},
        colorLight: action.colorLight,
        colorDark: action.colorDark,
        fill: action.fill,
        invert: action.invert !== undefined ? action.invert : false
      }
    case 'UPDATE_FILTER':
      return {
        ...state,
        name: action.name || state.name,
        data: action.data || state.data,
        colorLight: action.colorLight || state.colorLight,
        colorDark: action.colorDark || state.colorDark,
        fill: action.fill || state.fill,
        invert: action.invert !== undefined ? action.invert : state.invert
      }
    default:
      return state
  }
}

export default filter
