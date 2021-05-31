import React from 'react'
//компоненты
import AnswersItem from "../AnswersItem/AnswersItem";

//стили
import classes from './AnswersList.module.scss'

const AnswersList = ({answers, onAnswerClick, state}) => (
  <ul className={classes.AnswersList}>
    {answers.map(answer => {
      return(
          <AnswersItem
            key={answer.id}
            answer={answer}
            onAnswerClick={onAnswerClick}
            state={state ? state[answer.id] : null}
          />
        )
    })}
  </ul>
)

export default AnswersList