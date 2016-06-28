/*Компонент для Popup*/

import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class extends React.Component{
    constructor(props) {
      super(props)

      this.state = {
          showModal: false
      }
    }

    componentWillReceiveProps(new_props){
        if(new_props.task.name){
          this.setState({showModal: true})
        }
    }

    close() {
        this.props.clearModal()
        this.setState({showModal: false})
    }

    render() {
        return <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.props.task.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <table>
                      <tr>
                        <td>Id</td>
                        <td>{this.props.task.id}</td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>{this.props.task.name}</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{this.props.task.date}</td>
                      </tr>
                      <tr>
                        <td>Priority</td>
                        <td>{this.props.task.priority}</td>
                      </tr>
                      <tr>
                        <td>Target time</td>
                        <td>{this.props.task.target_time}</td>
                      </tr>
                      <tr>
                        <td>Spend time</td>
                        <td>{this.props.task.spend_time? this.props.task.spend_time : ''}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{this.props.task.status}</td>
                      </tr>
                    </table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                  </Modal.Footer>
                </Modal>
    }
}
