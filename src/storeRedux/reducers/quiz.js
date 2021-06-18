import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

const initialState = {
  //список тестов загруженных с сервера
  quizes: [],
  //loader
  loader: true
}

export default function quizReducer (state = initialState, action) {
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
    default:
      return state
  }
}