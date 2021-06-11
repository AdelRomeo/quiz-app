import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
//стили
import classes from './QuizList.module.scss'

export default class QuizList extends Component {

  state = {
    quizes: []
  }

  //кодга все зарендерилось
  async componentDidMount() {
    try {
      //получаем данные с сервера
      const response = await axios.get('https://quiz-app-n-e2d41-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')
      const quizes = [];
      //преобразование объекта в массив
      Object.keys(response.data).forEach((key, index)=>{
        quizes.push({
          id: key,
          name: `Тест №${index +1}`
        })
      })
      //заносим список полученый с сервера в state
      this.setState({
        quizes
      })
    } catch (e) {
      console.log(e)
    }
  }

  //рендер списка тестов
  renderQuizes() {
    return this.state.quizes.map(quiz => {
      console.log()
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id }>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}