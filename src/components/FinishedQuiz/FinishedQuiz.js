import React from 'react';

//стили
import classes from './FinishedQuiz.module.scss';

const FinishedQuiz = ({results, quiz, onRetry}) => {
  //счетчик для посчета количества правильных ответов
  let successCount = 0;
  Object.keys(results).forEach(item=>{
    if (results[item] === 'success'){
      successCount +=1;
    }
  })

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {
          quiz.map((quizItem, index) => {
            const cls = ['fa',
              results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              classes[results[quizItem.id]]
            ]
            return (
              <li key={index}>
                <strong>{index + 1} </strong>
                {quizItem.question}
                <i className={cls.join(' ')}/>
              </li>
            )
          })
        }
      </ul>
      <p>Правильно {successCount} из {quiz.length}</p>
      <div>
        <button onClick={onRetry}>повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz