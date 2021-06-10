import React from 'react';
//стили
import classes from './Select.module.scss';

const Select = ({label, value, onChange, options}) => {
  //генерация случайного id
  const htmlFor = `${label}-${Math.random()}`

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index)=>{
          return(
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select