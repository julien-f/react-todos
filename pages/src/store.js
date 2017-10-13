import { createStore, applyMiddleware, combineReducers } from "redux"
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const loggerMiddleware = createLogger()

export default createStore(
    combineReducers({
        rootReducer
    }), {}, applyMiddleware(loggerMiddleware, thunk, promise()))
