/*Роутер для приложения*/
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, Redirect} from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import {routerActions, syncHistoryWithStore} from 'react-router-redux'

import App from './components/App.jsx'
import Login from './components/Login.jsx'
import Tasks from './components/Tasks.jsx'
import Scrum from './components/Scrum.jsx'
import TypeTable from './components/TypeTable.jsx'
import {createNewStore} from './store.js'
import InitAuthWrapper from './components/containers/InitAuth.jsx'

var store = createNewStore(browserHistory)
var history = syncHistoryWithStore(browserHistory, store)

var UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.app.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
})


ReactDOM.render(
    <Provider store = {store}>
      <Router history={history} >
          <Route path="" component={App} >
            <Route path="login" component={Login} />
            <Route component={TypeTable}>
              <Route path="tasks" component={InitAuthWrapper(UserIsAuthenticated(Tasks))} />
              <Route path="scrum" component={InitAuthWrapper(UserIsAuthenticated(Scrum))} />
            </Route>
            <Redirect from="/" to="login"/>
            <Redirect from="/*" to="login"/>
          </Route>
      </Router>
    </Provider>,
    document.getElementById('content')
)
