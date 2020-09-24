import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : action.data))
    case 'NEW_ANECDOTE':
      return [...state].concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const currentVotes = await anecdote.votes
    const updatedAnecdote = await anecdoteService.addVote(anecdote.id, { ...anecdote, votes: currentVotes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export default anecdoteReducer
