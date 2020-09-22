const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.filter
    default:
      return state
  }
}

export const updateFilter = (input) => {
  return {
    type: 'FILTER_CHANGE',
    filter: input,
  }
}

export default filterReducer
