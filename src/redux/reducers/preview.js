// TODO: tests
const preview = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PREVIEW_LENGTH':
      return {length: action.length}
    default:
      return state
  }
}

export default preview
