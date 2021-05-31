import React from 'react';
//компоненты
import AnswersList from "../AnswersList/AnswersList";
//стили
import classes from './ActiveQuiz.module.scss'

//компонент активного вопроса
const ActiveQuiz = ({answers}) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2 </strong>
        Как дела?
      </span>
      <small>2 из 7</small>
    </p>
    <AnswersList
      answers={answers}
    />
  </div>
)

export default ActiveQuiz