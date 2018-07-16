// TODO: tests
const preview = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PREVIEW':
      return {length: action.length, name: action.name}
    default:
      return state
  }
}

export default preview
