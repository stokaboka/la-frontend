export const SET_RESULTS = (state, playload) => {
  state.results = playload
}

export const SET_SAVED_RESULTS = (state, playload) => {
  state.savedResults = playload
}

export const SET_COUNT = (state, playload) => {
  state.count = playload
}

export const SET_MODEL_PARAMS = (state, playload) => {
  state.model.params = playload
}
