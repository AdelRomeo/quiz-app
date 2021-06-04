import React, {Component} from 'react';
//компоненты
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
//стили
import classes from './Auth.module.scss';


export default class Auth extends Component {

  //авторизация
  LoginHandler = () => {

  }

  //регистрация
  RegisterHandler = () => {

  }

  //отмена действия по умолчанию формы
  submitHandler = e =>{
    e.preventDefault()
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>
            <Input
              label='Email'
            />
            <Input
              label='Пароль'
              errorMessage="test"
            />
            <Button type='success' onClick={this.LoginHandler}>Войти</Button>
            <Button type='primary' onClick={this.RegisterHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}