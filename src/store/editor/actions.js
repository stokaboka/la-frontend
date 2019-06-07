import axios from 'axios'

export const load = ({ commit, getters, rootGetters }, params = '') => {
  // console.log(params)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}${params}`
  commit('SET_LOADING', true)
  return axios.get(url)
    .then(response => {
      const data = response.data
      commit('SET_DATA', data)
      commit('SET_RESULT', 'OK')
      return data
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const insert = ({ commit, getters, rootGetters }, playload) => {
  // console.log(playload)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}`
  commit('SET_LOADING', true)
  return axios.post(url, playload)
    .then(response => {
      commit('SET_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const update = ({ commit, getters, rootGetters }, playload) => {
  // console.log(playload)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}`
  commit('SET_LOADING', true)
  return axios.put(url, playload)
    .then(response => {
      commit('SET_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const remove = ({ commit, getters, rootGetters }, playload) => {
  // console.log(playload)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}`
  commit('SET_LOADING', true)
  return axios.delete(url, playload)
    .then(response => {
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}
