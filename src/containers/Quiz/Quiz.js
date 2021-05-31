import React, {Component} from 'react';
//компоненты
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

//стили
import classes from './Quiz.module.scss';

export default class Quiz extends Component {

  state = {
    activeQuestion: 0,
    //правильынй или не правильный ответ
    answerState: null,
    //список вопросов
    quiz: [
      {
        //вопрос
        question: 'Какого цвета небо?',
        //вариант правильного ответа
        rightAnswerId: 2,
        id: 1,
        //варианты ответа
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зеленый', id: 4}
        ]
      },
      {
        //вопрос
        question: 'Какое число больше?',
        //вариант правильного ответа
        rightAnswerId: 3,
        id: 2,
        //варианты ответа
        answers: [
          {text: 20, id: 1},
          {text: 33, id: 2},
          {text: 129, id: 3},
          {text: 7, id: 4}
        ]
      }
    ]
  }

  //клики по вариантам ответа
  onAnswerClickHandler = answerId => {

    //активный вопрос
    const question = this.state.quiz[this.state.activeQuestion];

    //если правильный вариант равен варианту ответа на который кликнули
    if (question.rightAnswerId === answerId) {
      //ставим маркер 'правильный ответ'
      this.setState({
        answerState: {[answerId]: 'success'}
      })
      //timeout для визуализации
      const timeout = window.setTimeout(() => {
        //закончились ли вопросы
        if (this.isQuizFinished()) {
          console.log('Finished')
        } else {
          //переходим к следующему вопросу
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        //убираем timeout
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      //ставим маркер 'не правильный ответ'
      this.setState({
        answerState: {[answerId]: 'error'}
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {

    const {quiz, activeQuestion, answerState} = this.state

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            quizLength={quiz.length}
            onAnswerClick={this.onAnswerClickHandler}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        </div>
      </div>
    )
  }
}