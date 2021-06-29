import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_ERROR, QUIZ_FINISHED,
  QUIZ_NOT_FINISHED, QUIZ_RETRY,
  QUIZ_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  //список тестов загруженных с сервера
  quizes: [],
  //loader
  loader: false,
  //результаты теста
  results: {},
  //закочился ли опрос
  isFinished: false,
  //номер вопроса который сейчас отрендерен
  activeQuestion: 0,
  //правильынй или не правильный ответ
  answerState: null,
  //список вопросов
  quiz: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loader: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loader: false, quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loader: false
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, loader: false, quiz: action.payload
      }
    case QUIZ_SUCCESS:
      return {
        ...state, answerState: action.answerState, results: action.results
      }
    case QUIZ_ERROR:
      return {
        ...state, answerState: action.answerState, results: action.results
      }
    case QUIZ_FINISHED:
      return {
        ...state, isFinished: true
      }
    case QUIZ_NOT_FINISHED:
      return {
        ...state, activeQuestion: action.number, answerState: null,
      }
    case QUIZ_RETRY:
      return {
        ...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}
      }
    default:
      return state
  }
}