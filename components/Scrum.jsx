/*Основное компонент Scrum*/

import React from 'react'
import {connect} from 'react-redux'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import * as actions from './../actions'
import ScrumColumn from './ScrumColumn.jsx'

class Scrum extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tasks: this.props.tasks.slice(0)
        }
    }

    changeStatusTask(id, status){
        const task = this.state.tasks.find((task) => task.id == id)
        task.status = status
        this.props.dispatch(actions.changeStatusTaskScrum(this.state.tasks))
        this.forceUpdate()
    }

    render() {return<div className="scrum_table">
      <ScrumColumn id='Planned' tasks = {this.state.tasks} status={0} changeStatusTask={this.changeStatusTask.bind(this)}/>
      <ScrumColumn id='Processing' tasks = {this.state.tasks} status = {1} changeStatusTask={this.changeStatusTask.bind(this)}/>
      <ScrumColumn id='Completed' tasks = {this.state.tasks} status = {2} changeStatusTask={this.changeStatusTask.bind(this)}/></div>}
}

function selector(state) {
    return {tasks: state.app.tasks}
}

export default connect(selector)(DragDropContext(HTML5Backend)(Scrum))
