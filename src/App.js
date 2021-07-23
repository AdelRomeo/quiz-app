import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
//контейнер всего приложения
import Layout from "./hoc/Layout/Layout";
//комноненты
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Logout/Logout";

//стили
import classes from './App.module.scss';
import {connect} from "react-redux";

class App extends Component {

  render() {

    //если не авторизованы
    let routs = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' component={QuizList}/>
      </Switch>
    )

//если авторизованны
    if (this.props.isAuthenticated) {
      routs = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' component={QuizList}/>
        </Switch>
      )
    }
    console.log('auth', this.props.isAuthenticated)

    return (
      <Layout>
        {routs}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps)(App))
