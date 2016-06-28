/*Формирует модели данных, потом, посредством connect, формируем нащ props*/

import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import appReducer from './reducer'

var store;

export function createNewStore(history) {
    const reducer = combineReducers({
        app: appReducer,
        routing: routerReducer
    })

    const routingMiddleware = routerMiddleware(history)

    store = compose(applyMiddleware(routingMiddleware, thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )(createStore)(reducer)

    return store
}
