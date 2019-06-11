import axios from 'axios'

export const load = ({ commit, getters, rootGetters }, query = '') => {
  // console.log(params)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}${query}`
  commit('SET_LOADING', true)
  return axios.get(url)
    .then(response => {
      const data = response.data
      commit('SET_DATA', data)
      commit('SET_RESULT', 'OK')
      commit('SET_LAST_QUERY', query)
      commit('SET_LOADING', false)
      return data
    })
    .catch(error => {
      commit('SET_ERROR', error)
      commit('SET_LOADING', false)
      return false
    })
}

export const reload = ({ getters, dispatch }, module) => {
  return dispatch('load', getters['lastQuery'])
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
      commit('SET_LOADING', false)
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      commit('SET_LOADING', false)
      return false
    })
}

export const update = ({ commit, getters, rootGetters }, playload) => {
  // console.log(playload)
  const api = rootGetters['app/api']
  const suffix = getters['suffix']
  const url = `${api}/${suffix}`
  delete playload.__index
  commit('SET_LOADING', true)
  return axios.put(url, playload)
    .then(response => {
      commit('SET_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      commit('SET_LOADING', false)
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      commit('SET_LOADING', false)
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
      commit('SET_LOADING', false)
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      commit('SET_LOADING', false)
      return false
    })
}
