//объединение нескольких reducer'ov
import {combineReducers} from 'redux';
//reducers
import quizReducer from "./quiz";
import createReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})