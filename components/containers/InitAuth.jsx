/*Обертка,чтобы подключить store к авторизации*/

import React from 'react'
import {connect} from 'react-redux'
import * as actions from './../../actions'

export default (DecoratedPage) => {

    class InitAuthWrapper extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            if(!this.props.isAuthChecked) {
                this.props.dispatch(actions.checkAuth(this.props.location.pathname))
            }
        }

        render () {
          return <DecoratedPage {...this.props} />
        }
    }

    function select(state) {
          return {
            isAuthChecked: state.app.isAuthChecked
          }
    }

    return connect(select)(InitAuthWrapper)
}
