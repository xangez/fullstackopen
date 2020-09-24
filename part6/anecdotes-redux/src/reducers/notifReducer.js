const notifReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.message
    case 'CLEAR-NOTIF':
      return action.message
    default:
      return state
  }
}

// const clearNotif = () => {
//   return
// }

export const setNotif = (message, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIF', message })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR-NOTIF',
        message: '',
      })
    }, seconds * 1000)
  }
}

export default notifReducer
