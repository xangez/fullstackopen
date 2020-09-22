import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <h2>Create new</h2>
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <Anecdotes />
    </div>
  )
}

export default App
