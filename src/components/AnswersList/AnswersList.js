import React from 'react'
//компоненты
import AnswersItem from "../AnswersItem/AnswersItem";

//стили
import classes from './AnswersList.module.scss'

const AnswersList = ({answers}) => (
  <ul className={classes.AnswersList}>
    {answers.map((answer, index) => {
      return(
          <AnswersItem key={index} answer={answer}/>
        )
    })}
  </ul>
)

export default AnswersList