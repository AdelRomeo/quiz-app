import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
//стили
import classes from './QuizList.module.scss'

export default class QuizList extends Component{

  //рендер списка тестов
  renderQuizes(){
    return [1,2,3].map((quiz,index)=>{
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>
            Тест {quiz}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return(
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}