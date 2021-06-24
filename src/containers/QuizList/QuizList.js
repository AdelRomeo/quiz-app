import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
//стили
import classes from './QuizList.module.scss'
//подключение к store
import {connect} from "react-redux";
import {fetchQuizes} from "../../storeRedux/actions/quiz";

class QuizList extends Component {

  //когда все зарендерилось
  componentDidMount() {
    this.props.fetchQuizes()
  }

  //рендер списка тестов
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.props.loader ? <Loader/> : this.props.quizes.length === 0 ? <div>Список вопросов пуст</div> : this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}

//получаем state
function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loader: state.quiz.loader
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)