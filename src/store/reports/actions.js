
import axios from 'axios'
import { Notify } from 'quasar'

const errorNotify = function (error) {
  console.warn(error)
  Notify.create({
    message: `Что-то пошло не так...: ${error}`,
    color: 'negative',
    textColor: 'white',
    icon: 'error_outline'
  })
}

export const save = ({ getters }, data) => {
  return axios
    .post('/reports/save', data)
    .then(response => {
      console.log('REPORT SAVE', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const load = ({ getters }, data) => {
  return axios
    .post('/reports/result/xlsx', data)
    .then(response => {
      console.log('loadFile', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
