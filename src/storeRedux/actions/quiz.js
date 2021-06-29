import axios from '../../axios/axios-quiz'
import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, QUIZ_ERROR, QUIZ_FINISHED, QUIZ_NOT_FINISHED, QUIZ_RETRY, QUIZ_SUCCESS} from "./actionTypes";

//загрузка списка тестов
export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      //получаем данные с сервера
      const response = await axios.get('/quizes.json')
      const quizes = [];
      //получаем массив и ключей объекта и текста `Тест №${index +1}`
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

//начало загрузки
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

//список загрузился
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

//в случаи ошибки
export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}


//загрузка выбранного теста
export function fetchQuiz(quizId) {
  return async dispatch => {
    try {
      dispatch(fetchQuizesStart())
      //запрос к сервера за списком вопросов
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

//успешно загружен тест
export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}

//клил по ванианту ответа
export function answerClick(answerId) {
  return (dispatch, getState) => {

    const {answerState, quiz, results, activeQuestion} = getState().quiz
    console.log(getState().quiz)
    //проверка есть ли какой то ответ
    if (answerState) {
      //заносим в переменную первый элемент из массива ответов
      const key = Object.keys(answerState)[0]
      //если в первом элементе массива правильных ответов находится 'success'
      if (answerState[key] === 'success') {
        return
      }
    }

    //активный вопрос
    const question = quiz[activeQuestion];

    //если правильный вариант равен варианту ответа на который кликнули
    if (+question.rightAnswerId === answerId) {
      //добавляем в результаты данные о неправильном ответе
      results[question.id] = 'success'
      dispatch(quizSuccess({[answerId]: 'success'}, results))
    } else {
      //добавляем в результаты данные о неправильном ответе
      results[question.id] = 'error'
      dispatch(quizError({[answerId]: 'error'}, results))
    }
    //timeout для визуализации
    const timeout = window.setTimeout(() => {
      //закончились ли вопросы
      if (isQuizFinished(activeQuestion, quiz)) {
        dispatch(quizFinished())
      } else {
        dispatch(quizNotFinished(activeQuestion + 1))
      }
      //убираем timeout
      window.clearTimeout(timeout)
    }, 1000)
  }
}

//проверка закончен ли опрос
function isQuizFinished(activeQuestion, quiz) {
  return activeQuestion + 1 === quiz.length
}

//правильно ответили на вопрос
export function quizSuccess(answerState, results) {
  return {
    type: QUIZ_SUCCESS,
    answerState,
    results
  }
}

//не правильно ответили на вопрос
export function quizError(answerState, results) {
  return {
    type: QUIZ_ERROR,
    answerState,
    results
  }
}

//вопросы закончились
export function quizFinished() {
  return {
    type: QUIZ_FINISHED
  }
}

//вопросы не закончились (переход к следующему вопросу)
export function quizNotFinished(number) {
  return {
    type: QUIZ_NOT_FINISHED,
    number
  }
}

//клик по кнопке 'повторить'. переход к началу теста
export function onRetry() {
  return {
    type: QUIZ_RETRY
  }
}