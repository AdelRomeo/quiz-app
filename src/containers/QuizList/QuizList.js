import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
//стили
import classes from './QuizList.module.scss'

export default class QuizList extends Component {

  state = {
    //список тестов загруженных с сервера
    quizes: [],
    //loader
    loader: true
  }

  //когда все зарендерилось
  async componentDidMount() {
    try {
      //получаем данные с сервера
      const response = await axios.get('/quizes.json')
      const quizes = [];
      //получаем массив и ключей объекта и текста `Тест №${index +1}`
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      //заносим список полученый с сервера в state
      this.setState({
        loader: false, quizes
      })
    } catch (e) {
      console.log(e)
    }
  }

  //рендер списка тестов
  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
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
            {this.state.loader ? <Loader/> : this.state.quizes.length === 0 ? <div>Список вопросов пуст</div> : this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}