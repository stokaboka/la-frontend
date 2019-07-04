import axios from 'axios'
// import store from '../index'
import store from '../../store'

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
  if (mdl) return dispatch('load', mdl)
  return null
}

export const insert = ({ commit, getters, rootGetters }, playload) => {
  const { module, data } = playload
  const api = rootGetters['app/api']
  const url = `${api}/${module}`
  delete data.__index
  delete data.__state
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
  delete data.__index
  delete data.__state
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
  delete data.__index
  delete data.__state
  commit('SET_LOADING')
  return axios.delete(url, { data })
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

export const createRow = ({ commit, getters }, playload) => {
  const row = { __state: 'NEW' }
  for (let column of store.state[playload.module].model.columns) {
    row[column.name] = null
  }
  // commit('INSERT_ROW', { ...playload, row })
  return row
}
