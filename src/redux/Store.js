import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import apiReducer from './Reducer'

const appReducer = combineReducers({
    apiReducer,
})

const rootReducer = (state, action) => appReducer(state, action);

const logger = createLogger();


export default createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)