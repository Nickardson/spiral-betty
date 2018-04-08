// TODO: tests
const editing = (state = {}, action) => {
  switch (action.type) {
    case 'START_EDITING_PHOTO':
      return {editing: true}
    case 'END_EDITING_PHOTO':
      return {editing: false}
    default:
      return state
  }
}

export default editing
