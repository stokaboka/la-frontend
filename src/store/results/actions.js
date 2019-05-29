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

export const count = ({ commit, getters, rootGetters }) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']

  return axios.get(`${api}/answers/count/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_COUNT', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const load = ({ commit, getters, rootGetters }) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']

  return axios.get(`${api}/answers/list/user/${id}/attempt/${attempt}`)
    .then(response => {
      commit('SET_RESULTS', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const save = ({ commit, getters, rootGetters }, data) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']
  const postData = {
    ...data,
    idUser: id,
    attempt
  }

  return axios.post(`${api}/answers/save`, postData)
    .then(response => {
      Notify.create({
        message: 'Результат сохранен, Вы можете продолжить позднее.',
        color: 'positive',
        textColor: 'white',
        icon: 'done'
      })
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
