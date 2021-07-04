import {ADD_QUESTION, RESET_QUIZ} from "./actionTypes";
import axios from "../../axios/axios-quiz";

//добавление вопроса
export function addQuestion(item) {
  return {
    type: ADD_QUESTION,
    item
  }
}

//отправка теста на сервер
export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuiz())
  }
}

//обнуление списка вопросов
function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}