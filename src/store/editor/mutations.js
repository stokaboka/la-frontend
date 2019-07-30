import store from '../../store'
import Vue from 'vue'
import { initMethodsData, initSummaryRow } from '../../lib/calculator'

export const SET_LOADING = (state, loading) => {
  state.loading = true
}

export const SET_RESULT = (state, result) => {
  state.result = result
  state.error = ''
  state.loading = false
}

export const SET_ERROR = (state, error) => {
  state.result = 'error'
  state.error = error
  state.loading = false
}

/**
 *
 * @param state
 * @param playload = {
 *   module - module name/id
 *   suffix - api suffix
 *   query - url query
 *   data - data from response, for insert/update/delete
 * }
 * @constructor
 */
export const SET_MODULE_DATA_BY_ID = (state, playload) => {
  const rowId = playload.mode === 'UPDATE' ? playload.data.id : null

  const idx = store.state[playload.module].model.data.findIndex(e => e.id === rowId)
  if (idx >= 0) {
    store.state[playload.module].model.data.splice(idx, 1, playload.data)
  } else {
    store.state[playload.module].model.data.push(playload.data)
  }
}

export const REMOVE_MODULE_DATA_BY_ID = (state, playload) => {
  store.state[playload.module].model.data = store.state[playload.module].model.data.filter(e => e.id !== playload.data.id)
}

/**
 *
 * @param state
 * @param  playload = {
 *   module - module name/id
 *   suffix - api suffix
 *   query - url query
 *   data - data from response, for insert/update/delete
 * }
 * @constructor
 */
export const SET_MODULE_DATA = (state, playload) => {
  if (Array.isArray(playload.data)) {
    store.state[playload.module].model.data = playload.data
    store.state[playload.module].model.rowsNumber = playload.data.length
  } else {
    store.state[playload.module].model.data = playload.data.rows
    store.state[playload.module].model.rowsNumber = playload.data.rowsNumber
  }

  state.modules[playload.module] = playload
}

export const INSERT_ROW = (state, playload) => {
  if (!Array.isArray(store.state[playload.module].model.data)) {
    store.state[playload.module].model.data = []
  }
  store.state[playload.module].model.data.push(playload.row)
}

export const INIT_METHODS_DATA = (state, playload) => {
  const rows = store.state[playload.module].model.data
  const columns = store.state[playload.module].model.columns

  if (store.state[playload.module].model.columns.find(e => e.calculate)) {
    initMethodsData({ rows, columns })
  }
}

export const CALCULATE_SUMMARY = (state, playload) => {
  const rows = store.state[playload.module].model.data
  const columns = store.state[playload.module].model.columns

  if (store.state[playload.module].model.columns.find(e => e.summary)) {
    const summary = initSummaryRow({ rows, columns })
    Vue.set(store.state[playload.module].model, 'summary', summary)
    // console.log(store.state[playload.module].model)
  }
}

export const RESET_RELATIONS = (state, playload) => {
  if (store.state[playload.module].model.relations) {
    const relations = store.state[playload.module].model.relations
    relations.forEach(r => {
      Vue.set(store.state[playload.module].model, 'data', [])
      Vue.set(store.state[playload.module].model, 'rowsNumber', 0)
    })
  }
}

export const PREPARE_DATA = (state, playload) => {
}
