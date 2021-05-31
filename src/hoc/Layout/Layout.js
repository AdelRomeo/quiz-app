import React, {Component} from 'react';

//стили
import classes from './Layout.module.scss'

//контейнер для всего приложения
export default class Layout extends Component {
  render() {
    return(
      <div className={classes.Layout}>
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}