import React, {Component} from 'react';
//компоненты
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
//стили
import classes from './Quiz.module.scss';

export default class Quiz extends Component {

  state = {
    //результаты теста
    results: {},
    //закочился ли опрос
    isFinished: false,
    //номер вопроса который сейчас отрендерен
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

    //провека есть ли какой то ответ
    if (this.state.answerState) {
      //заносим в переменную первый элемент из массива ответов
      const key = Object.keys(this.state.answerState)[0]
      //если в первом элементе массива правильных ответов находится 'success'
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    //активный вопрос
    const question = this.state.quiz[this.state.activeQuestion];
    //результаты теста
    const results = this.state.results;

    //если правильный вариант равен варианту ответа на который кликнули
    if (question.rightAnswerId === answerId) {
      //добавляем в результаты данные о неправильном ответе
      results[question.id] = 'success'
      this.setState({
        //ставим маркер 'правильный ответ'
        answerState: {[answerId]: 'success'},
        //изменяем результаты теста
        results,
      })
    } else {
      //добавляем в результаты данные о неправильном ответе
      results[question.id] = 'error'
      this.setState({
        //ставим маркер 'не правильный ответ'
        answerState: {[answerId]: 'error'},
        //изменяем результаты теста
        results,
      })
    }
    //timeout для визуализации
    const timeout = window.setTimeout(() => {
      //закончились ли вопросы
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true
        })
      } else {
        this.setState({
          //переходим к следующему вопросу
          activeQuestion: this.state.activeQuestion + 1,
          //обнуляем стили
          answerState: null
        })
      }
      //убираем timeout
      window.clearTimeout(timeout)
    }, 1000)
  }

  //проверка закончен ли опрос
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  //обновление страницы и переход к начальному состоянию
  onRetryHandler = () => {
    //приводим state в начальное состояние
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {

    const {quiz, activeQuestion, answerState, results} = this.state

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                results={results}
                quiz={quiz}
                onRetry={this.onRetryHandler}
              />
              : <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                quizLength={quiz.length}
                onAnswerClick={this.onAnswerClickHandler}
                answerNumber={activeQuestion + 1}
                state={answerState}
              />
          }
        </div>
      </div>
    )
  }
}