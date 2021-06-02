import React, {Component} from 'react';
//компоненты
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
//стили
import classes from './Layout.module.scss'

//контейнер для всего приложения
export default class Layout extends Component {

  state = {
    menu: false
  }

  //оторбражение или скрытие меню
  toggleMenuHandler = ()=>{
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return(
      <div className={classes.Layout}>
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}