import React from 'react'
import { createSelector } from 'reselect'
import { injectState, provideState } from "freactal";
import { Map } from 'immutable'

const extractEventValue = fn => (event, ...args) => fn(event.target.value, ...args)
const extractEventTarget = fn => (event, ...args) => fn(event.target, ...args)
const eventPreventDefault = fn => (event, ...args) => {
  event.preventDefault()
  return fn(event, ...args)
}

const withState = provideState({
  initialState: () => ({
    display: 'all',
    newTodoLabel: ''
  }),
  effects: {
    /*
    initialize: (effects) => fetch('//localhost:20431/todos')
      .then(res => res.json()
        .then(todos => mergeIntoState({
          todos: new Map().withMutations(map => {
            todos.forEach(todo => {
              map.set(todo.id, todo)
            })
          })
        })
        )),*/
    sendToServer: (effects, todo) => fetch(`http://localhost:20431/todos/${todo.id}`, {
      body: JSON.stringify(todo),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT'
    }),
    onCreateTodo: (effects) => state => {

      if (state.newTodoLabel === '') { return }

      const id = Math.random().toString(36).slice(2)
      const todo = {
        completed: false,
        id,
        label: state.newTodoLabel
      }
      effects.sendToServer(todo)
      effects.updateTodo(todo)
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
      }),
    onDisplayChange: (_, value) => state =>
      ({
        ...state,
        display: value
      }),
    onTodoCompletionChange: (effects, target) => state =>  {

      const { id } = target.dataset
      const targetState = !target.checked

      effects.changeTodo(id, targetState)
      /*
      effects.updateTodo({
        ...state.todos.get(id),
        completed: target.checked
      })
      */
      //effects.sendToServer(todo)
    }

  },
  computed: {
    visibleTodos: ({ display, todos }) => (display === 'all') ? todos.valueSeq() :
      todos.valueSeq().filter(
        display === 'active'
          ? t => !t.completed
          : t => t.completed)
  }
})


export const TodoList = ({ state, effects, computed }) => (

  <div>
    <form onSubmit={eventPreventDefault(effects.onCreateTodo)}>
      <p>
        <input
          onChange={extractEventValue(effects.setNewTodoLabelChange)}
          placeholder='Type and press <Enter> to create an item'
          size='40'
          value={state.newTodoLabel}
        />
      </p>
    </form>
    <select onChange={extractEventValue(effects.onDisplayChange)} value={state.display}>
      <option value='all'>All</option>
      <option value='active'>Active</option>
      <option value='completed'>Completed</option>
    </select>
    <ul>
      {state.visibleTodos.map(({ completed, id, label }) =>
        <li key={id}>
          <label>
            <input
              checked={completed}
              data-id={id}
              onChange={extractEventTarget(effects.onTodoCompletionChange)}
              type='checkbox'
            />
            {' '}
            {completed
              ? <del>{label}</del>
              : label
            }
          </label>
        </li>
      )
      }
    </ul>
  </div>

)

export default withState(injectState(TodoList))