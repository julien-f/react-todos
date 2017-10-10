import React, { Component } from 'react'
import { Map } from 'immutable'
import { provideState, update, mergeIntoState, injectState } from "freactal";
import logo from './logo.svg'
import TodoList from './TodoList.js'
import './App.css'
import "isomorphic-fetch";

const wrapComponentWithState = provideState({
  initialState: () => ({
    todos: new Map()
  })
})

const App = wrapComponentWithState(({ state }) => {

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
})

export default App;
