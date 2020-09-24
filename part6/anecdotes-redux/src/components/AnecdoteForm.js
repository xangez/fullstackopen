import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.blog.value
    event.target.blog.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotif(`'${content}' added`, 5))
  }
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="blog" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
