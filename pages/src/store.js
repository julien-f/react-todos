import { observable, action } from 'mobx'

const appState = observable({
  todos: [],
  display: 'all',
  newTodoLabel: ''
})

appState.createTodo = action(() => {
  appState.newTodoLabel = ''
})

appState.freeInput = action(() => {
  appState.newTodoLabel = ''
})

appState.onCreateTodo = action(todo => {
  appState.todos.push(todo)
})

appState.updateTodoLabelChange = action(value => {
  appState.newTodoLabel = value
})

export default appState
