import axios from 'axios'
import { Notify } from 'quasar'

const showUserNotify = function (user, act) {
  let message = {
    positive: '',
    negative: ''
  }

  switch (act) {
    case 'signin':
      message.positive = `Выполнен вход пользователя: ${user.login}`
      message.negative = 'Пользователь не найден или неверный пароль'
      break
    case 'signout':
      message.positive = `Выполнен выход`
      message.negative = `Выполнен выход`
      break
    case 'register':
      message.positive = `Зарегистрирован пользователь: ${user.login}`
      message.negative = `При регистрирации пользователя произошла ошибка`
      break
  }
  if (user) {
    if (user.login) {
      Notify.create({
        message: message.positive,
        color: 'positive'
      })
    } else {
      Notify.create({
        message: message.negative,
        color: 'red'
      })
    }
  } else {
    Notify.create({
      message: message.positive,
      color: 'green'
    })
  }
}

export const signin = ({ commit, getters, rootGetters }, playload = { login: '-', password: '-' }) => {
  return axios.post(`${rootGetters['app/api']}/login`, playload)
    .then(response => {
      commit('SET_TOKEN', response.data.token)
      commit('SET_USER', response.data.user)
      commit('SET_OFFER', false)
      showUserNotify(getters['user'], 'signin')
    })
    .catch(error => {
      commit('SET_USER', null)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        commit('SET_OFFER', true)
      } else {
        Notify.create({
          message: `Что-то пошло не так...: ${error.message}`,
          type: 'negative'
        })
      }
    })
}

export const signout = ({ commit, getters, rootGetters }) => {
  commit('SET_OFFER', false)
  sessionStorage.setItem('token', '')
  axios.defaults.headers.common['Authorization'] = ''
  return axios.post(`${rootGetters['app/api']}/logout`)
    .then(response => {
      commit('SET_USER', null)
    })
    .catch(error => {
      commit('SET_USER', null)
      if (error.response.status === 401 || error.response.status === 403) {
        commit('SET_OFFER', true)
      } else {
        console.warn(error)
        Notify.create({
          message: `Что-то пошло не так...: ${error}`,
          type: 'negative'
        })
      }
    })
}

export const register = ({ commit, getters, rootGetters }, playload) => {
  const data = Object.assign({
    login: '-', password: '-', firstName: '-', secondName: '-', lastName: '-', birthday: new Date()
  }, playload)

  commit('SET_OFFER', false)

  return axios.post(`${rootGetters['app/api']}/register`, data)
    .then(response => {
      if (response.data.error) {
        commit('SET_TOKEN', '')
        commit('SET_USER', null)
        commit('SET_OFFER', true)
        Notify.create({
          message: response.data.error,
          type: 'negative'
        })
      } else {
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        commit('SET_OFFER', false)
        showUserNotify(getters['user'], 'register')
      }
    })
    .catch(error => {
      commit('SET_USER', null)
      console.warn(error)
      Notify.create({
        message: `Что-то пошло не так...: ${error}`,
        type: 'negative'
      })
    })
}
