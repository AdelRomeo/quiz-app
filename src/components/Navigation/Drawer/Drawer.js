import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
//компоненты
import Backdrop from "../../UI/Backdrop/Backdrop";
//стили
import classes from './Drawer.module.scss';

const links = [
  { to: '/', label: 'Список', exact: true},
  { to: '/auth', label: 'Авторизация', exact: false},
  { to: '/quiz-creator', label: 'Создать тест', exact: false},
]

export default class Drawer extends Component {

  //рендер пунктов меню
  renderLinks() {
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

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>

        </nav>
        {isOpen ? <Backdrop onClick={this.props.onToggle}/> : null}
      </>
    )
  }
}