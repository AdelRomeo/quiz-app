import React from 'react';
//стили
import classes from './Loader.module.scss'

const Loader = ()=>{
  return(
    <div className={classes.ldsRing}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  )
}

export default Loader