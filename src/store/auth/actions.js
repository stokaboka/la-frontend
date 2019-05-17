import axios from 'axios'
import { Notify } from 'quasar'

const showUserNotify = function (user, action) {
  let notify = {
    signin: {
      positive: {
        message: `Выполнен вход пользователя: ${user.login}`,
        color: 'green',
        textColor: 'black',
        icon: 'done'
      },
      negative: {
        message: 'Пользователь не найден или неверный пароль',
        color: 'red',
        textColor: 'black',
        icon: 'warning'
      }
    },
    signout: {
      positive: {
        message: 'Выполнен выход',
        color: 'yellow',
        textColor: 'black',
        icon: 'done'
      },
      negative: {
        message: 'Выполнен выход',
        color: 'yellow',
        textColor: 'black',
        icon: 'done'
      }
    },
    register: {
      positive: {
        message: `Зарегистрирован пользователь: ${user.login}`,
        color: 'green',
        textColor: 'black',
        icon: 'done'
      },
      negative: {
        message: `При регистрирации пользователя произошла ошибка`,
        color: 'red',
        textColor: 'white',
        icon: 'error_outline'
      }
    }
  }

  const result = (user && user.login) ? 'positive' : 'negative'
  Notify.create(notify[action][result])
}

export const signin = ({ commit, getters, rootGetters }, playload = { login: '-', password: '-' }) => {
  return axios.post(`${rootGetters['app/api']}/auth/signin`, playload)
    .then(response => {
      commit('SET_TOKEN', response.data.token)
      commit('SET_USER', response.data.user)
      showUserNotify(getters['user'], 'signin')
    })
    .catch(error => {
      commit('SET_USER', null)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      } else {
        Notify.create({
          message: `Что-то пошло не так...: ${error.message}`,
          type: 'negative'
        })
      }
    })
}

export const signout = ({ commit, getters, rootGetters }) => {
  sessionStorage.setItem('token', '')
  axios.defaults.headers.common['Authorization'] = ''
  return axios.post(`${rootGetters['app/api']}/auth/signout`)
    .then(response => {
      commit('SET_USER', null)
    })
    .catch(error => {
      commit('SET_USER', null)
      if (error.response.status === 401 || error.response.status === 403) {
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

  return axios.post(`${rootGetters['app/api']}/auth/register`, data)
    .then(response => {
      if (response.data.error) {
        commit('SET_TOKEN', '')
        commit('SET_USER', null)
        Notify.create({
          message: response.data.error,
          type: 'negative'
        })
      } else {
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
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
