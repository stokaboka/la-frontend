export const SET_MODEL = (state, model) => {
  state.title = model.title
  state.module = model.module
  state.suffix = model.suffix
  state.columns = model.columns
  state.edit = model.edit
  state.key = model.key
  state.filter = model.filter
  state.query = model.hasOwnProperty('query') ? model.query : false
}

export const SET_EDIT = (state, edit) => {
  state.edit = edit
}

export const SET_LOADING = (state, loading) => {
  state.loading = loading
}

export const SET_TITLE = (state, title) => {
  state.title = title
}

export const SET_COLUMNS = (state, columns) => {
  state.columns = columns
}

export const SET_API_SUFFIX = (state, playload) => {
  state.suffix = playload
}

export const SET_BY_ID = (state, playload) => {
  const idx = state.data.findIndex(e => e.id === playload.id)
  if (idx >= 0) {
    state.data[idx] = playload
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

export const SET_PARAMS = (state, playload) => {
  state.params[state.module] = playload
}
