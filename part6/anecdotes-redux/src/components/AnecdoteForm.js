import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifCreated, removeNotif } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.blog.value
    event.target.blog.value = ''
    dispatch(notifCreated(`'${content}' added`))
    dispatch(createAnecdote(content))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
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
