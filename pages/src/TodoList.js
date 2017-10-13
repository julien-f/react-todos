import React, { Component } from 'react'
import { observer } from 'mobx-react'

const TodoList = observer(
  ['store'],
  class TodoList extends Component {
    _createTodo = event => {
      event.preventDefault()

      const id = Math.random()
        .toString(36)
        .slice(2)

      const todo = {
        completed: false,
        id,
        label: this.props.store.newTodoLabel
      }
      this.props.store.onCreateTodo(todo)
      this.props.store.freeInput()
    }

    _onNewTodoLabelChange = ({ target }) => {
      this.props.store.updateTodoLabelChange(target.value)
    }

    render() {
      return (
        <div>
          <form onSubmit={this._createTodo}>
            <p>
              <input
                onChange={this._onNewTodoLabelChange}
                placeholder="Type and press <Enter> to create an item"
                size="40"
                value={this.props.store.newTodoLabel}
              />
            </p>
          </form>
          <ul>
            {this.props.store.todos.map(({ completed, id, label }) => (
              <li key={id}>
                <label>
                  <input checked={false} data-id={id} type="checkbox" /> {label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
)

export default TodoList
