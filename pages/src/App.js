import React from 'react'
import { Map } from 'immutable'
import { provideState } from "freactal";
import logo from './logo.svg'
import TodoList from './TodoList'
import './App.css'

const withState = provideState({
  initialState: () => ({
    todos: new Map()
  }),
  effects: {
    updateTodo: (_, todo) => (state) => ({ ...state, todos: state.todos.set(todo.id, todo) })
  }
})

export const App = ({ state, effects }) => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <TodoList />
      <TodoList />
    </div>
  )
}

export default withState(App)
