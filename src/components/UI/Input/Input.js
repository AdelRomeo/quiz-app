import React from 'react';
//стили
import classes from './Input.module.scss';

const Input = (props) => {

  //список классов
  const cls = [
    classes.Input
  ]

  //генерация id
  const htmlFor = `${props.type}-${Math.random()}`

  if (isInvalid(props)){
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type || 'text'}
        id={props.htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      { isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null }

    </div>
  )
}

//проверка валидности инпута
const isInvalid = ({valid, touched, shouldValidation}) => {
  //возвращаем true если input не валидный и он должен валидироваться и с ним уже взаимодействовали
  return !valid && shouldValidation && touched
}

export default Input