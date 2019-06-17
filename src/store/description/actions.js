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

export const load = ({ state, commit }, params) => {
  const results = params.results.map(e => `${e.part}*${e.phase}*${e.level}`).join('=')
  const paramsList = `test/${params.test}/results/${results}`

  return axios.get(`/descriptions/${paramsList}`)
    .then(response => {
      commit('SET_DESCRIPTION', response.data)
      return response.data
    })
    .catch(error => {
      commit('SET_DESCRIPTION', null)
      errorNotify(error.message)
      return null
    })
}
