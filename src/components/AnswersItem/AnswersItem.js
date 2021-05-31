import React from 'react'

//стили
import classes from './AnswersItem.module.scss'

const AnswersItem = ({answer})=>{
  return (
    <li className={classes.AnswersItem}>
      {answer.text}
    </li>
  )
}

export default AnswersItem