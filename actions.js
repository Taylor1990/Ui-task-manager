/*action.js - отправляет запросы на сервер и передает управление в reducer.js*/

import {push} from 'react-router-redux'

import initialData from './initialData'

export function login(data) {
    return (dispatch) => {
        const user = initialData.users.find((user) => {
            if(user.login == data.login && user.password == data.password) {
              return true
            }
            return false
        })

        let tasks = {}

        if(user) {
            tasks = initialData.tasks.filter((task) => {
                if(user.id == task.id_user) {
                    return true
                }
                return false
            })
        }

        dispatch(setUser(user, tasks))
        dispatch(push('/tasks'))
    }
}

export function setUser(user, tasks) {
    return {type: 'SET_USER', user: user, tasks: tasks}
}

export function changeStatusTask(tasks) {
    var status_type = {'Planned': 0, 'Processing': 1, 'Completed': 2}

    tasks.map((task) => {
        task.status = status_type[task.status]
        return task
    })

    return {type: 'CHANGE_STATUS_TASK', data: tasks }
}

export function changeStatusTaskScrum(tasks) {
    return {type: 'CHANGE_STATUS_TASK_SCRUM', data: tasks}
}

export function checkAuth(path) {
    return (dispatch) => {
        /*костыль до полноценной авторизации*/
        const user = initialData.users.find((user) => user.id = 1)
        const tasks = initialData.tasks.filter((task) => user.id = task.id_user)

        dispatch(setUser(user, tasks))
        dispatch(push(path))
    }
}
