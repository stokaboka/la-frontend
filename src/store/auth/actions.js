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

const showUserNotify = function (user, action) {
  const login = user ? user.login : ''
  let notify = {
    signin: {
      positive: {
        message: `Выполнен вход пользователя: ${login}`,
        color: 'green-10',
        textColor: 'white',
        icon: 'done'
      },
      negative: {
        message: 'Пользователь не найден или неверный пароль',
        color: 'negative',
        textColor: 'white',
        icon: 'warning'
      }
    },
    signout: {
      positive: {
        message: 'Выполнен выход',
        color: 'secondary',
        textColor: 'white',
        icon: 'done'
      },
      negative: {
        message: 'Выполнен выход',
        color: 'secondary',
        textColor: 'white',
        icon: 'done'
      }
    },
    register: {
      positive: {
        message: `Зарегистрирован пользователь: ${login}`,
        color: 'green-10',
        textColor: 'white',
        icon: 'done'
      },
      negative: {
        message: `При регистрирации пользователя произошла ошибка`,
        color: 'negative',
        textColor: 'white',
        icon: 'error_outline'
      }
    }
  }

  const result = user && user.login ? 'positive' : 'negative'
  Notify.create(notify[action][result])
}

export const signin = (
  { commit, getters, rootGetters },
  playload = { login: '-', password: '-' }
) => {
  return axios
    .post(`${rootGetters['app/api']}/auth/signin`, playload)
    .then(response => {
      commit('SET_TOKEN', response.data.token)
      commit('SET_USER', response.data.user)
      showUserNotify(getters['user'], 'signin')
    })
    .catch(error => {
      commit('SET_USER', null)
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
      } else {
        errorNotify(error.message)
      }
    })
}

export const signout = ({ commit, getters, rootGetters }) => {
  sessionStorage.setItem('token', '')
  axios.defaults.headers.common['Authorization'] = ''
  return axios
    .post(`${rootGetters['app/api']}/auth/signout`, getters['user'])
    .then(response => {
      commit('SET_USER', null)
      showUserNotify(null, 'signout')
    })
    .catch(error => {
      commit('SET_USER', null)
      if (error.response.status === 401 || error.response.status === 403) {
      } else {
        errorNotify(error)
      }
    })
}

export const register = ({ commit, getters, rootGetters }, playload) => {
  const data = Object.assign(
    {
      login: '-',
      password: '-',
      firstName: '-',
      secondName: '-',
      lastName: '-',
      birthday: new Date()
    },
    playload
  )

  return axios
    .post(`${rootGetters['app/api']}/auth/register`, data)
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
      errorNotify(error)
    })
}

export const fixAttempt = ({ commit, rootGetters }) => {
  const { id, attempt } = rootGetters['auth/user']
  const api = rootGetters['app/api']

  return axios
    .post(`${api}/users/fix`, { id, attempt })
    .then(response => {
      commit('SET_CLOSED')
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
