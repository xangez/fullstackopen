import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
// import { createAnecdote } from './reducers/anecdoteReducer'
// import { notifChange } from './reducers/notifReducer'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notifReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

store.subscribe(() => console.log(store.getState()))
// store.dispatch(notifChange(''))
// store.dispatch(createAnecdote('stuff asvasdv'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
