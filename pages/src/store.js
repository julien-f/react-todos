import { observable, action } from "mobx";
//import { Map } from 'immutable'

const appState = observable({
  todos: observable(new Map()),
  display: "all",
  newTodoLabel: ""
});

appState.freeInput = action(() => {
  appState.newTodoLabel = "";
});

appState.onCreateTodo = action(todo => {
  fetch(`/todos/${todo.id}`, {
    headers: {
      body: JSON.stringify(todo),
      "content-type": "application/json"
    },
    method: "PUT"
  }).catch(() => console.log("erreur requeete send to server"));

  appState.todos.set(todo.id, todo);
  console.log(appState.todos);
});

appState.updateTodoLabelChange = action(value => {
  appState.newTodoLabel = value;
});

appState.initialLoad = action(() =>
  fetch("/todos").then(res =>
    res.json().then(
      action(toDos => {
        toDos.forEach(function(todo) {
          appState.todos.set(todo.id, todo);
        }, this);
      })
    )
  )
);

export default appState;
