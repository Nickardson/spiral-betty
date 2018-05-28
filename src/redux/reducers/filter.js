// TODO: tests
const filter = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        name: action.name,
        data: action.data || {},
        colorIndex: action.colorIndex
      }
    case 'UPDATE_FILTER':
      return {
        ...state,
        name: action.name || state.name,
        data: action.data || state.data,
        colorIndex: action.colorIndex !== undefined ? action.colorIndex : state.colorIndex
      }
    default:
      return state
  }
}

export default filter
