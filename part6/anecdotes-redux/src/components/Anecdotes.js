import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifVoted, removeNotif } from '../reducers/notifReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => anecdote.content.includes(state.filter))
  })

  const voteEvents = (id, content) => {
    dispatch(vote(id))
    dispatch(notifVoted(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteEvents(anecdote.id, anecdote.content)} />
      ))}
    </div>
  )
}

export default Anecdotes
