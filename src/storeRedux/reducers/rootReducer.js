//объединение нескольких reducer'ov
import {combineReducers} from 'redux';
//reducers
import quizReducer from "./quiz";

export default combineReducers({
  quiz: quizReducer
})