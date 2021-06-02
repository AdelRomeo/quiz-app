import React, {Component} from 'react';
//компоненты
import Backdrop from "../../UI/Backdrop/Backdrop";
//стили
import classes from './Drawer.module.scss';

const links = [1, 2, 3]

export default class Drawer extends Component {

  //рендер пунктов меню
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
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