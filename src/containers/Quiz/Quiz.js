import React, {Component} from 'react';
//компоненты
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {answerClick, fetchQuiz, onRetry} from "../../storeRedux/actions/quiz";
//стили
import classes from './Quiz.module.scss';

class Quiz extends Component {

  //когда компонент удаляется со страницы
  componentWillUnmount() {
    this.props.onRetry()
  }

  //когда дом дерево готово
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id)
  }

  render() {

    const {quiz, activeQuestion, answerState, results, loading, isFinished} = this.props

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
                onRetry={this.props.onRetry}
              />
              : <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                quizLength={quiz.length}
                onAnswerClick={this.props.answerClick}
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
    //загрузка теста
    fetchQuiz: id => dispatch(fetchQuiz(id)),
    //клики на варианты ответа
    answerClick: answerId => dispatch(answerClick(answerId)),
    //клик по кнопке 'повторить'. переход к началу теста
    onRetry: () => dispatch(onRetry())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)