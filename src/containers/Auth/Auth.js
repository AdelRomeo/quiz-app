import React, {Component} from 'react';
//компоненты
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
//стили
import classes from './Auth.module.scss';

//валидация email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

  state = {
    //инпуты
    formControls: {
      email: {
        //значение в input по умолчанию
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        //прошла ли валидация
        valid: false,
        //взаимодействовали ли с элементом
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        //значение в input по умолчанию
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        //прошла ли валидация
        valid: false,
        //взаимодействовали ли с элементом
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  //авторизация
  LoginHandler = () => {

  }

  //регистрация
  RegisterHandler = () => {

  }

  //отмена действия по умолчанию формы
  submitHandler = e => {
    e.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    //копия объекта из state
    const formControls = {...this.state.formControls}
    //копия одного эемента из объекта (this.state.formControls.email или this.state.formControls.password)
    const control = {...formControls[controlName]}

    //задаем значение в поле input
    control.value = event.target.value;
    //флаг того что с инпутом взаимдействовали
    control.touched = true
    //прошли ли валидация
    control.valid = this.validateControl(control.value, control.validation)

    //изменяем элемент в копии из state
    formControls[controlName] = control

    //изменяем state
    this.setState({
      formControls
    })
  }

  //проверка валдиности
  validateControl = (value, validation) => {
    //valid - то что проверяем
    //validation - правила по которым проверяем

    //если нет параментров для валидации (не надо валидировать)
    if (!validation) {
      return true;
    }

    let isValid = true;

    //если есть validation.required (есть ли что то в строке input'a)
    if (validation.required){
      //если строка в input'e не пустая и до этого значение isValid не false то isValid - true
      isValid = value.trim() !== '' && isValid;
    }
    //если есть validation.email
    if (validation.email){
      isValid = validateEmail(value) && isValid
    }
    //если есть validation.minLength
    if (validation.minLength){
      //если длина строки в input'e больше или равно 6 и до этого значение isValid не false то isValid - true
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  //рендер input`ов
  renderInputs = () => {
    //Object.keys(this.state.formControls) = [email, password]
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {type, value, valid, touched, label, errorMessage, validation} = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          errorMessage={errorMessage}
          shouldValidation={!!validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <Button type='success' onClick={this.LoginHandler}>Войти</Button>
            <Button type='primary' onClick={this.RegisterHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}