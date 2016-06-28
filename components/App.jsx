/*Основной компонент, формирует шапку*/

import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import './../styles.scss'

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href = "#">UI таск менеджер</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem href="#"></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {this.props.children}
          </div>
        )
    }
}
