import React, {Component} from 'react';
//компоненты
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuiz} from "../../storeRedux/actions/quiz";
//стили
import classes from './Quiz.module.scss';

class Quiz extends Component {

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
    if (+question.rightAnswerId === answerId) {
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

  //когда дом дерево готово
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  render() {

    const {quiz, activeQuestion, answerState, results, loading, isFinished} = this.props

    console.log(this.props)

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            loading || !quiz
              ? <Loader/>
              : isFinished
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

function mapStateToProps(state) {
  return {
    //результаты теста
    results: state.quiz.results,
    //закочился ли опрос
    isFinished: state.quiz.isFinished,
    //номер вопроса который сейчас отрендерен
    activeQuestion: state.quiz.activeQuestion,
    //правильынй или не правильный ответ
    answerState: state.quiz.answerState,
    //список вопросов
    quiz: state.quiz.quiz,
    loading: state.quiz.loader
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuiz: (id) => dispatch(fetchQuiz(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)