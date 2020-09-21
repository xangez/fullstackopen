const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      state = { ...state, good: state.good + 1 }
      return state
    case 'NEUTRAL':
      state = { ...state, neutral: state.neutral + 1 }
      return state
    case 'BAD':
      state = { ...state, neutral: state.bad + 1 }
      return state
    case 'RESET':
      state = { ...state, good: 0, neutral: 0, bad: 0 }
      return state
    default:
      return state
  }
}

export default counterReducer
