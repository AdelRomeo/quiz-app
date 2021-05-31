import React, {Component} from 'react'
//контейнер всего приложения
import Layout from "./hoc/Layout/Layout";
//комноненты
import Quiz from "./containers/Quiz/Quiz";

//стили
import classes from './App.module.scss';

class App extends Component {
  render() {
    return (
      <Layout>
        <Quiz/>
      </Layout>
    );
  }
}

export default App;
