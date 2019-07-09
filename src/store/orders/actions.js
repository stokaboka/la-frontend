import axios from 'axios'
import { Notify } from 'quasar'
import { objectToParamStr } from '../../lib/utils'
import FileSaver from 'file-saver'

const errorNotify = function (error) {
  console.warn(error)
  Notify.create({
    message: `Что-то пошло не так...: ${error}`,
    color: 'negative',
    textColor: 'white',
    icon: 'error_outline'
  })
}

export const load = ({ commit, rootGetters }, params) => {
  return axios
    .get('/orders', params)
    .then(response => {
      commit('SET_DATA', response.data)
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}

export const save = ({ commit }, params) => {
  return axios
    .post('/orders', params)
    .then(response => {
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}

export const saveAs = ({ getters }, params) => {
  const { filename } = params
  const keys = ['id', 'format']
  const pStr = objectToParamStr(keys, params)
  return axios({
    url: `/orders/reports/${pStr}`,
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
