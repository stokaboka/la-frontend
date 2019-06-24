
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

export const xlsx = ({ getters }, data) => {
  return axios
    .post('/reports/result/xlsx', data)
    .then(response => {
      console.log('XLSX', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
