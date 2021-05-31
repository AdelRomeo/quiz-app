import React from 'react'

//стили
import classes from './AnswersItem.module.scss'

const AnswersItem = ({answer, onAnswerClick, state}) => {

  const cls = [classes.AnswersItem]

  if (state){
    cls.push(classes[state])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  )
}

export default AnswersItem