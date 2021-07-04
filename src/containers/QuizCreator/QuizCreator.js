import React, {Component, Fragment} from 'react';
//компоненты
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../form/formFramework';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
//стили
import classes from './QuizCreator.module.scss';
import {addQuestion, createQuiz} from "../../storeRedux/actions/create";

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

class QuizCreator extends Component {

  state = {
    //прошла ли форма валидацию
    isFormValid: false,
    //выбранный правильный вариант ответа при создании вопроса
    rightAnswerId: 1,
    //инпуты
    formControls: createFormControls()
  }

  //отменяем действие по умолчанию
  submitHandler(e) {
    e.preventDefault()
  }

  //добавление вопроса
  addQuestionHandler = (e) => {
    e.preventDefault()

    const {question, option1, option2, option3, option4} = this.state.formControls

    //элемент вопроса со всем данными
    const questionItem = {
      //текст вопроса
      question: question.value,
      id: this.props.quiz.length + 1,
      //номер правильного ответа
      rightAnswerId: +this.state.rightAnswerId,
      //варианты ответа
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    //добавляем готовый элемент вопроса в клон state
    this.props.addQuestion(questionItem)

    //изменение state
    this.setState({
      //прошла ли форма валидацию
      isFormValid: false,
      //выбранный правильный вариант ответа при создании вопроса
      rightAnswerId: 1,
      //инпуты
      formControls: createFormControls()
    })

  }

  //изменение в поле input'a (варинаты ответа)
  changeHandler = (value, controlName) => {
    //копия объекта из state
    const formControls = {...this.state.formControls}
    //копия одного эемента из объекта (this.state.formControls.email или this.state.formControls.password)
    const control = {...formControls[controlName]}

    //с контролом взаимодействовали
    control.touched = true;
    //отображение записи в поле инпута
    control.value = value;
    //прошел ли контрол валидацию
    control.valid = validate(control.value, control.validation);

    //изменяем элемент в копии из state
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  //создание и отправка теста на сервер
  createQuizHandler = async (event) => {
    //event.preventDefault()

    //отправляем данные на сервер
    //await axios.post('/quizes.json', this.state.quiz)
    this.props.createQuiz()

    this.setState({
      //прошла ли форма валидацию
      isFormValid: false,
      //выбранный правильный вариант ответа при создании вопроса
      rightAnswerId: 1,
      //инпуты
      formControls: createFormControls()
    })
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

  //выбор варианта ответа
  selectChangeHandler = (event) => {
    this.setState({
      //визуальное отображение выбранного варианта
      rightAnswerId: event.target.value
    })
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
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Link to='/'>
              <Button
                type='success'
                onClick={this.createQuizHandler}
                disabled={this.props.quiz.length === 0}

              >
                Создать тест
              </Button>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //добавление вопроса
    addQuestion: (item) => dispatch(addQuestion(item)),
    //отправка теста на сервер
    createQuiz: () => dispatch(createQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)