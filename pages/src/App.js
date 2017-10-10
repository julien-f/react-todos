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
    fetch('//localhost:20431/todos').then(res =>
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

  _onCreateTodo = todo => {
    const { id } = todo
    const { todos } = this.state
    const previous = todos.get(id)

    this.setState({ todos: todos.set(id, todo) })

    fetch(`//localhost:20431/todos/${id}`, {
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

  _onDeleteElementToDo = id => {

  fetch(`/todos/${id}`, {

    body: JSON.stringify(id),
    headers: {
      'content-type': 'application/json'
    },
    method: 'DELETE'
   }).then(response => response.json()
         .then( responseJSON => {
              this.setState({ todos:  new Map().withMutations(map => {
                  Object.keys(responseJSON).forEach(id => {
                  map.set(id, responseJSON[id])
            })
          })
        });

       }

    )

  );

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
          onCreateTodo={this._onCreateTodo}
          onEditTodo={this._onEditTodo}
          onDeleteElementToDo={this._onDeleteElementToDo}
          todos={state.todos}
        />
        <TodoList
          onCreateTodo={this._onCreateTodo}
          onEditTodo={this._onEditTodo}
          onDeleteElementToDo={this._onDeleteElementToDo}
          todos={state.todos}
        />
      </div>
    )
  }
}

export default App
