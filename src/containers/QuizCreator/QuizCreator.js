import React, {Component, Fragment} from 'react';
//компоненты
import Button from "../../components/UI/Button/Button";
import {createControl} from '../../form/formFramework';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
//стили
import classes from './QuizCreator.module.scss';

//генерация данных для вариантов ответа
function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

//очистка formControls
function createFormControls() {
  return {
    //вопрос
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {

  state = {
    rightAnswerId: 1,
    //список вопросов
    quiz: [],
    //инпуты
    formControls: createFormControls()
  }

  //отменяем действие по умолчанию
  submitHandler(e) {
    e.preventDefault()
  }

  //добавление вопроса
  addQuestionHandler = () => {

  }

  //изменение в поле input'a
  changeHandler = (value, controlName) => {

  }

  //создание теста
  createQuizHandler = () => {

  }

  //рендпер инпутов
  renderInputs = () => {
    //проходим по каждому элементу объекта
    return Object.keys(this.state.formControls).map((controlName, index) => {
      // control = this.state.formControls.question или  this.state.formControls.option1 и т.д.
      const control = this.state.formControls[controlName];

      return (
        <Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidation={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Fragment>
      )
    })
  }

  selectChangeHandler = (event)=>{
    console.log(event.target.value)
  }

  render() {

    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
        ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderInputs()}

            {select}

            <Button
              type='primary'
              onClick={this.createQuizHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.addQuestionHandler}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}