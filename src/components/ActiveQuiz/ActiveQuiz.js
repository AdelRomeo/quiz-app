import React from 'react';
//компоненты
import AnswersList from "../AnswersList/AnswersList";
//стили
import classes from './ActiveQuiz.module.scss'

//компонент активного вопроса
const ActiveQuiz = ({answers, question, answerNumber, quizLength, onAnswerClick, state}) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{answerNumber}. </strong>
        {question}
      </span>
      <small>{`${answerNumber} из ${quizLength}`}</small>
    </p>
    <AnswersList
      answers={answers}
      onAnswerClick={onAnswerClick}
      state={state}
    />
  </div>
)

export default ActiveQuiz