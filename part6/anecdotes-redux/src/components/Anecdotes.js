import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'

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

  const voteEvents = async (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotif(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteEvents(anecdote)} />
      ))}
    </div>
  )
}

export default Anecdotes
