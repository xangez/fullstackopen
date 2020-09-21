import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + bad + neutral
  let average = (good + bad * -1) / all
  let positive = (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="postive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
    console.log(store.getState().good)
  }

  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL',
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const resetStats = () => {
    store.dispatch({
      type: 'RESET',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={resetStats}>reset stats</button>
      <h1>Statistic</h1>
      <Statistics good={store.getState().good} neutral={store.getState().neutral} bad={store.getState().bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
