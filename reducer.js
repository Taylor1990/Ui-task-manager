/*Изменяет наш store после выполнения action.js*/

import _ from 'lodash'

export default (state, action) => {
    if(action.type) {
        switch(action.type) {
            case 'SET_USER':
                if(action.user) {
                    state.user = action.user
                    state.tasks = action.tasks
                    state.isAuthChecked = true
                }
                break
            case 'CHANGE_STATUS_TASK':
                state.tasks = action.data
                break
           case 'CHECK_AUTH':
                break
           case 'CHANGE_STATUS_TASK_SCRUM' :
                state.tasks = action.data
                break
        }
    }

    state = _.extend({}, state)

    return state
}
