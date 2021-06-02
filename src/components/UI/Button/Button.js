import React from 'react';

//стили
import classes from './Button.module.scss';

//компонент кнопки
const Button = ({children, onClick, disabled, type}) => {

  const cls = [
    classes.Button,
    classes[type]
  ]

  return(
    <button
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button