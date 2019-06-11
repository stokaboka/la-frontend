export const SET_EDIT = (state, edit) => {
  state.edit = edit
}

export const SET_LOADING = (state, loading) => {
  state.loading = loading
}

export const SET_BY_ID = (state, playload) => {
  const idx = state.data.findIndex(e => e.id === playload.id)
  if (idx >= 0) {
    // state.data[idx] = playload
    state.data.splice(idx, 1, playload)
  } else {
    state.data.push(playload)
  }
}

export const SET_DATA = (state, data) => {
  if (Array.isArray(data)) {
    state.data = data
    state.rowsNumber = data.length
  } else {
    state.data = data.rows
    state.rowsNumber = data.rowsNumber
  }

  state.loading = false
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

export const SET_LAST_QUERY = (state, playload) => {
  state.lastQuery = playload
}
