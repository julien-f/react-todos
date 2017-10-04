import React, { Component } from 'react'
import { Map } from 'immutable'

import logo from './logo.svg'
import TodoList from './TodoList.js'
import './App.css'

class App extends Component {
  state = {
    todos: new Map()
  }

  componentWillMount () {
    fetch('/todos').then(res =>
      res.json().then(todos => {
        this.setState({
          todos: new Map().withMutations(map => {
            todos.forEach(todo => {
              map.set(todo.id, todo)
            })
          })
        })
      })
    )
  }

  _onTodoRemove = id => {
    //this.state = todos.filter((todo) => {})
    // filter out the todo that has to be removed
    let list = new Map()
    list= this.state.todos.delete(id)
    // update state
    this.setState({
      todos: list
    })
    fetch(`/todos/${id}`, {
      headers: {
        'content-type': 'text/plain'
      },
      method: 'POST'
    }).catch(() => {
    })
    }

  _onCreateTodo = todo => {
    const { id } = todo
    const { todos } = this.state
    const previous = todos.get(id)

    this.setState({ todos: todos.set(id, todo) })

    fetch(`/todos/${id}`, {
      body: JSON.stringify(todo),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT'
    }).catch(() => {
      this.setState({
        todos: previous === undefined
          ? todos.delete(id)
          : todos.set(id, previous)
      })
    })
  }

  _onEditTodo = this._onCreateTodo

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
          onCreateTodo={this._onCreateTodo}
          onEditTodo={this._onEditTodo}
          todos={state.todos}
          onRemove={this._onTodoRemove}
        />
        <TodoList
          onCreateTodo={this._onCreateTodo}
          onEditTodo={this._onEditTodo}
          todos={state.todos}
          onRemove={this._onTodoRemove}
        />
      </div>
    )
  }
}

export default App
