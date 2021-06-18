import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

//загрузка списка тестов
export function fetchQuizes() {
  return async dispatch =>{
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
     dispatch(fetchQuizeSuccess(quizes))
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
export function fetchQuizeSuccess(quizes) {
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