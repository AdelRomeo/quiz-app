import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
  return async dispatch => {
    //создание объекта для конфигурации отправляемых данных
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    //ссылка на регистрацию
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgoTIrbMXM2NfSy3B64Kg7B07_S6JVA0I'

    //если логинимся
    if (isLogin) {
      //подставляем ссылку для логина
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgoTIrbMXM2NfSy3B64Kg7B07_S6JVA0I'
    }

    //отправка данных на сервер
    const response = await axios.post(url, authData)
    const data = response.data

    //дата окончания сессии (+ 1 час от даты создания переменной)
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    //записываем данные в localStorage
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(authLogout(data.expiresIn))
  }
}

//записываем в state данные пользователя
function authSuccess(token) {
  return {
    type: AUTH_SUCCESS, token
  }
}

//разлогиниваемся через час
function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  //удаляем данные из localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

//автологин
export function autoLogin() {
  return dispatch => {
    //получаем токен из localStorage
    const token = localStorage.getItem('token')
    //если токена нет
    if (!token) {
      dispatch(logout())
    } else {
      //дата окончания сессии
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      //если дата окончаниии сесси меньше или равна дате на данный момент
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        //логинимся в систему
        dispatch(authSuccess(token))
        dispatch(authLogout((expirationDate - new Date().getTime()) / 1000))
      }
    }
  }
}