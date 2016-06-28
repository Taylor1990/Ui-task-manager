/*Колонка Scrum*/

import React from 'react'
import {ListGroup} from 'react-bootstrap'

import ScrumTask from './ScrumTask.jsx'
import {DropTarget} from 'react-dnd';

const typeColumn = ['danger', 'warning', 'success'],
      typeColumnName = {'Planned' : 0, 'Processing' : 1, 'Completed': 2}

const columnTarget = {
    drop(props, monitor){
      props.changeStatusTask(monitor.getItem().id, typeColumnName[props.id])
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class ScrumColumn extends React.Component{
    constructor(props){
      super(props)
    }

    render(){
      const {connectDropTarget, isOver} = this.props;

      return connectDropTarget(<div className="scrum_column"><ListGroup id={this.props.id}>
          {this.props.tasks.map((task) => {
              if(task.status == this.props.status){
                return <div><ScrumTask id={task.id} bsStyle={typeColumn[task.status]} task = {task}/></div>
              }
          })}
      </ListGroup></div>)
    }
}

export default DropTarget('task', columnTarget, collect)(ScrumColumn)
