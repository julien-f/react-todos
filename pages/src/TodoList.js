import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createSelector } from 'reselect'
import { injectState } from "freactal";
import { Map } from 'immutable'

const TodoList = injectState(({ state, effects }) => {
  
      const onNewTodoLabelChange = ev => effects.setNewTodoLabelChange(ev.target.value)
      const onCreateTodo = ev => { ev.preventDefault()
                                   effects.onCreateTodo() }
  
      return (
          <div>
              <form onSubmit={onCreateTodo}>
                  <p>
                      <input
                          onChange={onNewTodoLabelChange}
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
  })
  
  export default TodoList