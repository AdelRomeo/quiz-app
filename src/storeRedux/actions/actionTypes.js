//начала загрузки списка тестов
export const FETCH_QUIZES_START = 'FETCH_QUIZES_START'
//загрузка тестов прошла успешно
export const FETCH_QUIZES_SUCCESS = 'FETCH_QUIZES_SUCCESS'
//произошла ошибка при загрузке тестов
export const FETCH_QUIZES_ERROR = 'FETCH_QUIZES_ERROR'
//успешно загружен выбранный тест
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS'

//правильно ответили на вопрос
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS'
//не правильно ответили на вопрос
export const QUIZ_ERROR = 'QUIZ_ERROR'
//вопросы закончились
export const QUIZ_FINISHED = 'QUIZ_FINISHED'
//вопросы не закнчились (переход к следеующему вопросу)
export const QUIZ_NOT_FINISHED = 'QUIZ_NOT_FINISHED'
//клик по кнопке 'повторить'. переход к началу теста
export const QUIZ_RETRY = 'QUIZ_RETRY'

//добавление вопроса при создании
export const ADD_QUESTION = 'ADD_QUESTION'
//обнуление списка вопросов
export const RESET_QUIZ = 'RESET_QUIZ'