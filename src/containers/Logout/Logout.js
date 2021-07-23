import React, {Component} from "react";
import {connect} from "react-redux";
import {logout} from "../../storeRedux/actions/auth";
import {Redirect} from "react-router-dom";

//компонент выхода из системы
class Logout extends Component {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <Redirect to={'/'}/>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {dispatch(logout())}
  }
}

export default connect(null, mapDispatchToProps)(Logout)