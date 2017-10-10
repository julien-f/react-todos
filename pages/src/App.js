//import io from 'socket.io';
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

    // Create WebSocket connection.
    let socket = new WebSocket('ws://localhost:3000');
    this.socket = socket

    // Receiving a message from the server
    socket.onmessage = msg => {
      let todos = JSON.parse(msg.data);
      let {id} = todos
      console.log(todos);
      this.setState({ todos: Map(todos)})
      /*
      if(Object.keys(todos).length>0){
      this.setState({ todos: new Map().withMutations(map => {
            todos.forEach(todo => {
              map.set(todo.id, todo)
            })
          })
        })}*/
      console.log("todos");
    }

    // Connection opened
    socket.onopen = () => {
      let msg = {data : "send me data"}
      this.socket.send(JSON.stringify(msg));
    }
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
    let msg = {data : "Delete data", id:id}
    this.socket.send(JSON.stringify(msg));
    }

  _onCreateTodo = todo => {
    const { id } = todo
    let { todos } = this.state
    this.setState({ todos: todos.set(id, todo)})
    this.socket.send(JSON.stringify(todo));
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
