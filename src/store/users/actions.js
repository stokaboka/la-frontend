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

// const showUserNotify = function (user, action) {
//   const login = user ? user.login : ''
//   let notify = {
//     signin: {
//       positive: {
//         message: `Выполнен вход пользователя: ${login}`,
//         color: 'green-10',
//         textColor: 'white',
//         icon: 'done'
//       },
//       negative: {
//         message: 'Пользователь не найден или неверный пароль',
//         color: 'negative',
//         textColor: 'white',
//         icon: 'warning'
//       }
//     },
//     signout: {
//       positive: {
//         message: 'Выполнен выход',
//         color: 'secondary',
//         textColor: 'white',
//         icon: 'done'
//       },
//       negative: {
//         message: 'Выполнен выход',
//         color: 'secondary',
//         textColor: 'white',
//         icon: 'done'
//       }
//     },
//     register: {
//       positive: {
//         message: `Зарегистрирован пользователь: ${login}`,
//         color: 'green-10',
//         textColor: 'white',
//         icon: 'done'
//       },
//       negative: {
//         message: `При регистрирации пользователя произошла ошибка`,
//         color: 'negative',
//         textColor: 'white',
//         icon: 'error_outline'
//       }
//     }
//   }
//
//   const result = user && user.login ? 'positive' : 'negative'
//   Notify.create(notify[action][result])
// }

export const fixAttempt = ({ commit, getters }) => {
  const { id, attempt } = getters['authUser']

  return axios
    .post('/users/fix', { id, attempt })
    .then(response => {
      commit('SET_CLOSED')
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const usersCount = ({ commit, getters }) => {
  return axios
    .get('/users/count')
    .then(response => {
      commit('SET_USERS_TOTAL_COUNT', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}

export const usersList = ({ commit }, params) => {
  return axios
    .get('/users/find', params)
    .then(response => {
      commit('SET_USERS', response.data)
    })
    .catch(error => {
      errorNotify(error.message)
    })
}
