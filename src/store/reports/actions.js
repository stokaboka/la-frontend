import axios from 'axios'
import { Notify } from 'quasar'
import { objectToParamStr } from '../../lib/utils'
import FileSaver from 'file-saver'

const errorNotify = function (error) {
  // eslint-disable-next-line no-console
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
      // console.log('REPORT SAVE', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const load = ({ getters }, params) => {
  const { filename } = params
  const keys = ['user', 'test', 'attempt', 'format']
  const pStr = objectToParamStr(keys, params)
  return axios({
    url: `/reports/${pStr}`,
    method: 'GET',
    responseType: 'blob' // important
  })
    .then(response => {
      FileSaver.saveAs(new Blob([response.data]), filename)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
