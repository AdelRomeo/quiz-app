import React, {Component} from 'react';
//компоненты
import Button from "../../components/UI/Button/Button";
//стили
import classes from './QuizCreator.module.scss';

export default class QuizCreator extends Component {

  //отменяем действие по умолчанию
  submitHandler(e) {
    e.preventDefault()
  }

  //добавление вопроса
  addQuestionHandler = () => {

  }

  //создание теста
  createQuizHandler = () => {

  }


  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            <input type="text"/>
            <hr/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
            <input type="text"/>
            <select></select>
            <Button
              type='primary'
              onClick={this.createQuizHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.addQuestionHandler}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}