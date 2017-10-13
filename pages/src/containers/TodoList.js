import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { _FREE_INPUT, _ON_DISPLAY_CHANGE, _ON_NEW_TODO_LABEL_CHANGE } from '../actions/rootActions.js'


class TodoList extends Component {

  static propTypes = {
    onCreateTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired,
    todos: ImmutablePropTypes.mapOf(
      PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      }).isRequired,
      PropTypes.string.isRequired
    )
  }

  _createTodo = event => {
    event.preventDefault()

    const newTodoLabel = this.props.rootReducer.newTodoLabel.trim()
    if (newTodoLabel === '') {
      return
    }

    //Reset Input
    this.props._FREE_INPUT()

    // all items of collection should have a unique identifier
    const id = Math.random().toString(36).slice(2)
    const todo = {
      completed: false,
      id,
      label: newTodoLabel
    }

    this.props.onCreateTodo(todo)
  }

  // - what's a selector?
  // - what's a memoized selector?
  //
  // see https://github.com/reactjs/reselect

  _getVisibleTodos = createSelector(
    state => this.props.rootReducer.display,
    (_, props) => props.todos,
    (display, todos) => {
      if (display === 'all') {
        return todos.valueSeq()
      }

      return todos.valueSeq().filter(
        display === 'active'
          ? t => !t.completed
          : t => t.completed
      )
    }
  )

  _onDisplayChange = ({ target }) => {
    this.props._ON_DISPLAY_CHANGE(target.value)
  }

  _onNewTodoLabelChange = ({ target }) => {
    this.props._ON_NEW_TODO_LABEL_CHANGE(target.value)
  }

  _onTodoCompletionChange = ({ target }) => {
    const { id } = target.dataset
    const { props } = this
    props.onEditTodo({
      ...props.todos.get(id),
      completed: target.checked
    })
  }

  render() {
    const { state } = this
    return (
      <div>
        <form onSubmit={this._createTodo}>
          <p>
            <input
              onChange={this._onNewTodoLabelChange}
              placeholder='Type and press <Enter> to create an item'
              size='40'
              value={this.props.rootReducer.newTodoLabel}
            />
          </p>
        </form>
        <select
          value={this.props.rootReducer.display}
          onChange={this._onDisplayChange}>
          <option value='all'>All</option>
          <option value='active'>Active</option>
          <option value='completed'>Completed</option>
        </select >

        <ul>
          {this._getVisibleTodos(state, this.props).map(({ completed, id, label }) =>
            <li key={id}>
              <label>
                <input
                  checked={completed}
                  data-id={id}
                  onChange={this._onTodoCompletionChange}
                  type='checkbox'
                />
                {' '}
                {completed
                  ? <del>{label}</del>
                  : label
                }
              </label>
            </li>
          )}
        </ul>

      </div >
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
    _FREE_INPUT: () => {
      dispatch(_FREE_INPUT())
    },
    _ON_DISPLAY_CHANGE: (value) => {
      dispatch(_ON_DISPLAY_CHANGE(value))
    },
    _ON_NEW_TODO_LABEL_CHANGE: (value) => {
      dispatch(_ON_NEW_TODO_LABEL_CHANGE(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
