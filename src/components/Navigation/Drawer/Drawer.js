import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
//компоненты
import Backdrop from "../../UI/Backdrop/Backdrop";
//стили
import classes from './Drawer.module.scss';
import {connect} from "react-redux";

class Drawer extends Component {

  //рендер пунктов меню
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onToggle}
          >{link.label}</NavLink>
        </li>
      )
    })
  }

  render() {

    //флаг показа меню
    const {isOpen} = this.props;

    const cls = [classes.Drawer];
    //добавление или удаленик класса видимости меню
    if (!isOpen) {
      cls.push(classes.close)
    }


    let links = [
      {to: '/', label: 'Список', exact: true},
    ]

    //если авторизованны
    if (this.props.isAuthenticated){
      links.push(
        {to: '/quiz-creator', label: 'Создать тест', exact: false},
        {to: '/logout', label: 'Выйти', exact: false}
      )
      //если не авторизованны
    } else {
      links.push(
        {to: '/auth', label: 'Авторизация', exact: false}
      )
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>

        </nav>
        {isOpen ? <Backdrop onClick={this.props.onToggle}/> : null}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token
  }
}

export default connect(mapStateToProps)(Drawer)