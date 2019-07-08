import axios from 'axios'
import { Notify } from 'quasar'
import { objectToParamStr } from '../../lib/utils'

const errorNotify = function (error) {
  console.warn(error)
  Notify.create({
    message: `Что-то пошло не так...: ${error}`,
    color: 'negative',
    textColor: 'white',
    icon: 'error_outline'
  })
}

export const load = ({ commit }, params) => {
  const keys = ['user', 'test', 'attempt']
  const pStr = objectToParamStr(keys, params)
  return axios
    .get(`/levels/${pStr}`, params)
    .then(response => {
      // console.log(response.data)
      commit('SET_LEVEL', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const save = ({ commit, getters, rootGetters }, params) => {
  return axios
    .post('/levels/save', params)
    .then(response => {
      commit('SET_LEVEL', params)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
