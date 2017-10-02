import React, { Component } from 'react'
import { Map } from 'immutable'

import logo from './logo.svg'
import TodoList from './TodoList.js'
import './App.css'

class App extends Component {
  state = {
    todos: new Map()
  }

  _onTodosChange = todos => {
    this.setState({ todos })
  }

  render() {
    const { state } = this
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Todos</h1>
        </header>

        {/* those two lists will share the same data */}
        <TodoList
          onChange={this._onTodosChange}
          todos={state.todos}
        />
        <TodoList
          onChange={this._onTodosChange}
          todos={state.todos}
        />
      </div>
    )
  }
}

export default App
