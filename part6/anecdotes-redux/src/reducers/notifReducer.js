const notifReducer = (state = '', action) => {
  switch (action.type) {
    case 'ANECDOTE_CREATED':
      return action.message
    case 'ANECDOTE_VOTED':
      return action.message
    case 'REMOVE-NOTIF':
      return action.message
    default:
      return state
  }
}

export const notifCreated = (message) => {
  return {
    type: 'ANECDOTE_CREATED',
    message,
  }
}

export const notifVoted = (message) => {
  return {
    type: 'ANECDOTE_VOTED',
    message,
  }
}

export const removeNotif = () => {
  return {
    type: 'REMOVE-NOTIF',
    message: '',
  }
}

export default notifReducer
