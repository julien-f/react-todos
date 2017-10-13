import { Map } from 'immutable'

const rootReducer = (state = {
    todos: new Map(),
    display: 'all',
    newTodoLabel: ''
}, action) => {
    switch (action.type) {
        case "_INITIAL_LOAD":
            state = {
                ...state,
                todos: action.value
            }
            break;
        case "_INITIAL_LOAD_REJECTED":
            state = {
                ...state,
                todos: action.value
            }
            console('initial rejected')
            break;
        case "_CREATE_TODO":
            state = {
                ...state,
                todos: state.todos.set(action.value.id, action.value.todo)
            }
            break;
        case "_FREE_INPUT":
            state = {
                ...state,
                newTodoLabel: action.value
            }
            break;
        case "_ON_DISPLAY_CHANGE":
            state = {
                ...state,
                display: action.value
            }
            break;
        case "_ON_NEW_TODO_LABEL_CHANGE":
            state = {
                ...state,
                newTodoLabel: action.value
            }
            break;
        default: state
    }
    return state;
}

export default rootReducer