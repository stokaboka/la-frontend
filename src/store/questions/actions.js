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

export const count = ({ state, commit }, params) => {
  const keys = ['test', 'part', 'phase']
  const paramsList = objectToParamStr(keys, params)
  // const paramsCount = `test/${state.test}/part/${state.part}/phase/${state.phase}`

  return axios.get(`/questions/count/${paramsList}`)
    .then(response => {
      commit('SET_PHASE_QUESTIONS_COUNT', response.data)
    })
    .catch(error => {
      commit('SET_PHASE_QUESTIONS_COUNT', 0)
      errorNotify(error.message)
    })
}

export const load = ({ state, commit }, params) => {
  const keys = ['test', 'part', 'phase', 'category']
  const paramsList = objectToParamStr(keys, params)

  return axios.get(`/questions/${paramsList}`)
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
