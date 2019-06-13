import axios from 'axios'

export const load = ({ commit, getters, rootGetters }, playload) => {
  const api = rootGetters['app/api']
  const { module, query } = playload
  const url = `${api}/${module}${query}`
  commit('SET_LOADING')
  return axios.get(url)
    .then(response => {
      const data = response.data
      commit('SET_RESULT', 'OK')
      commit('SET_MODULE_DATA', { ...playload, data })
      return data
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const reload = ({ getters, dispatch }, playload) => {
  const { module } = playload
  const mdl = getters['modules'][module]
  const query = mdl ? mdl.query ? mdl.query : '' : ''
  return dispatch('load', query)
}

export const insert = ({ commit, getters, rootGetters }, playload) => {
  const { module, data } = playload
  const api = rootGetters['app/api']
  const url = `${api}/${module}`
  commit('SET_LOADING')
  return axios.post(url, data)
    .then(response => {
      commit('SET_MODULE_DATA_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const update = ({ commit, getters, rootGetters }, playload) => {
  const { module, data } = playload
  const api = rootGetters['app/api']
  const url = `${api}/${module}`
  delete playload.__index
  commit('SET_LOADING')
  return axios.put(url, data)
    .then(response => {
      commit('SET_MODULE_DATA_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const remove = ({ commit, getters, rootGetters }, playload) => {
  const { module, data } = playload
  const api = rootGetters['app/api']
  const url = `${api}/${module}`
  commit('SET_LOADING')
  return axios.delete(url, data)
    .then(response => {
      commit('REMOVE_MODULE_DATA_BY_ID', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}
