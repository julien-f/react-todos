import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createSelector } from 'reselect'
import { injectState, provideState, update, mergeIntoState } from "freactal";
import { Map } from 'immutable'

const persistEventInputValue = fn => (event, ...args) => fn(event.target.value, ...args)
const persistEvent = fn => (event, ...args) => {
  event.preventDefault()
  return fn(event, ...args)
}

const withState = provideState({
  initialState: () => ({
    newTodoLabel: ''
  }),
  effects: {
    initialize: (effects) => fetch('//localhost:20431/todos')
      .then(res => res.json()
        .then(todos => mergeIntoState({
          todos: new Map().withMutations(map => {
            todos.forEach(todo => {
              map.set(todo.id, todo)
            })
          })
        })
        )),
    sendToServer: (effects, todo) => fetch(`http://localhost:20431/todos/${todo.id}`, {
      body: JSON.stringify(todo),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT'
    }),
    onCreateTodo: (effects, event) => state => {
      const id = Math.random().toString(36).slice(2)
      const todo = {
        id,
        label: state.newTodoLabel
      }
      effects.sendToServer(todo)
      effects.createTodo(todo)
      effects.freeInput()
    },
    freeInput: () => state => ({
      ...state,
      newTodoLabel: ''
    }),
    setNewTodoLabelChange: (_, value) => state =>
      ({
        ...state,
        newTodoLabel: value
      })
  }
})

export const TodoList = ({ state, effects }) => (

  <div>
    <form onSubmit={persistEvent(effects.onCreateTodo)}>
      <p>
        <input
          onChange={persistEventInputValue(effects.setNewTodoLabelChange)}
          placeholder='Type and press <Enter> to create an item'
          size='40'
          value={state.newTodoLabel}
        />
      </p>
    </form>
    <ul>
      {state.todos.valueSeq().map(({ id, label }) =>
        <li key={id}>
          <label>
            {label}
          </label>
        </li>
      )}
    </ul>
  </div>

)

export default withState(injectState(TodoList));