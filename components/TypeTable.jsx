/*Компонент для переключения с таблицы на Scrum*/

import React from 'react'
import {Nav, NavItem} from 'react-bootstrap'

const activeTab = {'/tasks': 1, '/scrum': 2}

export default class extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      active: activeTab[props.location.pathname]
    }
  }

  render() {
    return <div >
              <Nav bsStyle="pills" activeKey = {this.state.active}>
                <NavItem eventKey={1} href="/tasks">Table</NavItem>
                <NavItem eventKey={2} href="/scrum">Scrum</NavItem>
              </Nav>
              {this.props.children}
           </div>
  }
}
