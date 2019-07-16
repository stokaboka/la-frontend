import axios from 'axios'
import store from '../../store'

const getModuleDataRowValue = (options, playload) => {
  const { module, column, row, getter, property } = playload
  let out = null
  if (column) {
    const { data } = store.state[module].model
    if (data) {
      if (data.length > row) {
        const rowData = data[row]
        if (rowData[column]) {
          out = rowData[column]
        }
      }
    }
  }
  if (getter) {
    out = options.rootGetters[`${module}/${getter}`]
    if (property) {
      out = out[property]
    }
  }
  return out
}

export const load = ({ commit, getters, rootGetters }, playload) => {
  const { module, query } = playload
  const url = `${module}${query}`
  commit('SET_LOADING')

  return axios.get(url)
    .then(response => {
      const data = response.data
      const initData = { ...playload, data }
      commit('SET_RESULT', 'OK')
      commit('SET_MODULE_DATA', initData)
      commit('INIT_METHODS_DATA', initData)
      commit('CALCULATE_SUMMARY', initData)
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
  const url = `${module}`
  delete data.__index
  delete data.__state
  commit('SET_LOADING')
  return axios.post(url, data)
    .then(response => {
      const { data } = response
      commit('SET_MODULE_DATA_BY_ID', { ...playload, data, mode: 'INSERT' })
      commit('INIT_METHODS_DATA', playload)
      commit('CALCULATE_SUMMARY', playload)
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
  const url = `${module}`
  delete data.__index
  delete data.__state
  commit('SET_LOADING')
  return axios.put(url, data)
    .then(response => {
      const { data } = response
      commit('SET_MODULE_DATA_BY_ID', { ...playload, data, mode: 'UPDATE' })
      commit('INIT_METHODS_DATA', playload)
      commit('CALCULATE_SUMMARY', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    })
}

export const remove = ({ commit, getters, rootGetters }, playload) => {
  const { module, data } = playload
  const url = `${module}`
  delete data.__index
  delete data.__state
  commit('SET_LOADING')
  return axios.delete(url, { data })
    .then(response => {
      commit('REMOVE_MODULE_DATA_BY_ID', playload)
      commit('INIT_METHODS_DATA', playload)
      commit('CALCULATE_SUMMARY', playload)
      commit('SET_RESULT', 'OK')
      return true
    })
    .catch(error => {
      commit('SET_ERROR', error)
      return false
    })
}

export const createRow = ({ commit, getters, rootGetters }, playload) => {
  const row = { __state: 'NEW' }
  const { columns } = store.state[playload.module].model
  for (let column of columns) {
    let val = null
    if (column.source) {
      val = getModuleDataRowValue({ commit, getters, rootGetters }, column.source)
    }
    if (column.default) {
      if (typeof column.default === 'function') {
        val = column.default()
      } else {
        val = column.default
      }
    }
    row[column.name] = val
  }
  return row
}

export const getValue = ({ commit, getters, rootGetters }, playload) => {
  return getModuleDataRowValue({ commit, getters, rootGetters }, playload)
}
