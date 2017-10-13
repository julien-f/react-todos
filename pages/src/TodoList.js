import React, { Component } from "react";
import { observer, inject } from "mobx-react";

const TodoList = inject("store")(
  observer(
    class TodoList extends Component {
      componentWillMount() {
        this.props.store.initialLoad();
      }

      _createTodo = event => {
        event.preventDefault();

        const id = Math.floor(Math.random() * 100 + 1);

        const todo = {
          completed: false,
          id,
          label: this.props.store.newTodoLabel
        };
        this.props.store.onCreateTodo(todo);
        this.props.store.freeInput();
      };

      _onNewTodoLabelChange = ({ target }) => {
        this.props.store.updateTodoLabelChange(target.value);
      };

      render() {
        const todosTab = [];

        this.props.store.todos.forEach(function(todo) {
          todosTab.push(
            <li key={todo.id}>
              <label>
                <input checked={false} data-id={todo.id} type="checkbox" />{" "}
                {todo.label}
              </label>
            </li>
          );
        }, this);

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
            <ul>{todosTab}</ul>
          </div>
        );
      }
    }
  )
);

export default TodoList;
