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

export const load = ({ commit, rootGetters }, params) => {
  return axios
    .get('/courses', params)
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
    .post('/courses', params)
    .then(response => {
      return response.data
    })
    .catch(error => {
      errorNotify(error.message)
      return null
    })
}
