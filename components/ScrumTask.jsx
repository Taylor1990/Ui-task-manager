/*Задача в Scrum*/

import React from 'react'
import {ListGroupItem} from 'react-bootstrap'
import {DragSource} from 'react-dnd'

const taskSource = {
  beginDrag(props){
    return {id: props.task.id}
  }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ScrumTask extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        task: this.props.task
    }
  }

  render(){
    const {task} = this.state
    const {connectDragSource, isDragging} = this.props

    return connectDragSource(<div><ListGroupItem
                                bsStyle={this.props.bsStyle}
                                style={{
                                   opacity: isDragging ? 0.5 : 1,
                                   cursor: 'move'
                                }}>
                                {this.props.task.name}
                              </ListGroupItem></div>)
  }
}

export default DragSource('task', taskSource, collect)(ScrumTask)
