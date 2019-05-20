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

export const load = ({ commit, getters, rootGetters }, parameters) => {
  return axios.get(`${rootGetters['app/api']}/questions/${getters['params']}`)
    .then(response => {
      commit('SET_QUESTIONS', response.data)
      commit('SET_QUESTION_INDEX', 0)
    })
    .catch(error => {
      commit('SET_QUESTIONS', [])
      commit('SET_QUESTION_INDEX', 0)
      errorNotify(error.message)
    })
}

export const reset = ({ commit }, params) => {
  commit('SET_TEST', params.test)
  commit('SET_PART', params.part)
  commit('SET_PHASE', params.phase)
  commit('SET_CATEGORY', 1)
}
