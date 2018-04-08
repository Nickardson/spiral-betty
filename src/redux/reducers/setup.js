// TODO: tests
// Similiar to a fetching
const setup = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_INIT':
      return {init: true}
    default:
      return state
  }
}

export default setup
