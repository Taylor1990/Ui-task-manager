import React from 'react'
import {FormGroup, ControlLabel,FormControl,Button} from 'react-bootstrap';
import {connect} from 'react-redux'

import * as actions from './../actions'

class LoginPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          login : '',
          password: ''
      }
    }

    login () {
        this.props.dispatch(actions.login({
            login: this.state.login,
            password: this.state.password
        }))
    }

    changeLogin (e) {
        this.setState({login: e.target.value})
    }

    changePassword(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return(
            <form className = "LoginForm">
                <FormGroup bsClass = "LoginForm_form">
                    <ControlLabel>Login</ControlLabel>
                    <FormControl
                        type='text'
                        value={this.state.login}
                        placeholder='Enter login'
                        onChange = {this.changeLogin.bind(this)}
                    />
                    <FormControl
                      type="password"
                      value={this.state.password}
                      placeholder="Enter password"
                      onChange = {this.changePassword.bind(this)}
                    />
                    <FormControl.Feedback />
                    <Button bsStyle = "primary" onClick = {this.login.bind(this)}>Login</Button>
                </FormGroup>
            </form>
        )
    }
}

function select(state) {
      return {
          data: state.app
      }
}

export default connect(select)(LoginPage)
