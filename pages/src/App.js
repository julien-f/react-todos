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

    let socket = new WebSocket('ws://localhost:3000');
    this.socket = socket

    socket.onmessage = msg => {
      let todos = JSON.parse(msg.data);
      this.setState({ todos: Map(todos)})
    }

  }

  componentWillUnmount(){
    this.socket.close()
  }

  _onTodoRemove = id => {
    const { todos } = this.state
    this.setState({
      todos: todos.delete(id)
    })
    let data = {action : "delete", id:id}
    this.socket.send(JSON.stringify(data));
    }

  _onCreateTodo = todo => {
    const { id } = todo
    let { todos } = this.state
    this.setState({ todos: todos.set(id, todo)})
    let data = {action : "set", todo:todo}
    this.socket.send(JSON.stringify(data));
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
