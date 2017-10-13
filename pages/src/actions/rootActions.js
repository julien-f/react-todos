import { Map } from 'immutable'
import fetch from 'isomorphic-fetch'

export function _CREATE_TODO(todo) {

    const { id } = todo

    fetch(`/todos/${id}`, {
        body: JSON.stringify(todo),
        headers: {
            'content-type': 'application/json'
        },
        method: 'PUT'
    })

    return {
        type: "_CREATE_TODO",
        value: { id, todo }
    }

}


export function _INITIAL_LOAD() {

    return dispatch => {
        fetch('/todos').then(res =>
            res.json().then(todos => {
                dispatch({
                    type: "_INITIAL_LOAD",
                    value : Map().withMutations(map => {
                        todos.forEach(todo => {
                            map.set(todo.id, todo)
                        })
                    })
                }) 
            })
        )
    }

return {
    type: "_INITIAL_LOAD",
    value: fetch('/todos').then(res =>
        res.json().then(todos => {
            return new Map().withMutations(map => {
                todos.forEach(todo => {
                    map.set(todo.id, todo)
                })
            })
        })
    )
}
}


export function _FREE_INPUT() {

    return {
        type: "_FREE_INPUT",
        value: ''
    }

}

export function _ON_DISPLAY_CHANGE(value) {

    return {
        type: "_ON_DISPLAY_CHANGE",
        value: value
    }

}

export function _ON_NEW_TODO_LABEL_CHANGE(val) {

    return {
        type: "_ON_NEW_TODO_LABEL_CHANGE",
        value: val
    }

}
