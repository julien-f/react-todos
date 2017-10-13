import React, { Component } from 'react'
import logo from '../logo.svg'
import TodoList from './TodoList.js'
import { connect } from 'react-redux'
import { _CREATE_TODO, _INITIAL_LOAD } from '../actions/rootActions.js'
import './App.css'

class App extends Component {
 
  componentWillMount () {
    this.props._INITIAL_LOAD()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Todos</h1>
        </header>

        
        <TodoList
          onCreateTodo={this.props._CREATE_TODO}
          onEditTodo={this.props._CREATE_TODO}
          todos={this.props.rootReducer.todos}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rootReducer: state.rootReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _CREATE_TODO: (todo) => {
      dispatch(_CREATE_TODO(todo))
    },
    _INITIAL_LOAD: () => {
      dispatch(_INITIAL_LOAD())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)