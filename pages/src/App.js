import React, { Component } from 'react'
import { Map } from 'immutable'
import { provideState, update, mergeIntoState } from "freactal";
import logo from './logo.svg'
import TodoList from './TodoList.js'
import './App.css'
import "isomorphic-fetch";

const wrapComponentWithState = provideState({
  initialState: () => ({
    todos: new Map(),
    newTodoLabel: '',
    gitInfo: ''
  }),
  effects: {
    initialize: (effects) => fetch('//localhost:20431/todos')
      .then(res => res.json()
        .then(todos => mergeIntoState({
          todos: new Map().withMutations(map => {
            todos.forEach(todo => {
              map.set(todo.id, todo)
            })
          })
        })
        )),
    sendToServer: (effects, todo, id) => fetch(`http://localhost:20431/todos/${id}`, {
      body: JSON.stringify(todo),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT'
    }).catch(() => {
      console.log('caught promise')
    }),
    onCreateTodo: (effects) => state => {
      const id = Math.random().toString(36).slice(2)
      const todo = {
        id,
        label: state.newTodoLabel
      }
      effects.sendToServer(todo, id)
      effects.createTodo(todo)
      effects.freeInput()
    },
    freeInput: update(state => ({ newTodoLabel: '' })),
    createTodo: update((state, todo) => ({ todos: state.todos.set(todo.id, todo) })),
    setNewTodoLabelChange: update((state, val) => ({ newTodoLabel: val })),
  }
})

const App = wrapComponentWithState(({ state, effects }) => (

  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <TodoList />
  </div>
))

export default App;
