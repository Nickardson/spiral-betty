// TODO: tests
const setup = (state = {}, action) => {
  switch (action.type) {
    case 'TEMP':
      return {...state, [action.prop]: action.value}
    default:
      return state
  }
}

export default setup
