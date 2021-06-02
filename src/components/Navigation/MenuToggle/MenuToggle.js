import React from 'react';

//стили
import classes from './MenuToggle.module.scss'

const MenuToggle = ({onToggle, isOpen}) => {

  const cls = [classes.MenuToggle ,'fa']

  if (isOpen) {
    cls.push('fa-times');
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={onToggle}
    />
  )
}

export default MenuToggle