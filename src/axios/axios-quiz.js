import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-app-n-e2d41-default-rtdb.europe-west1.firebasedatabase.app/'
})