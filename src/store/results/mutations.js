export const SET_RESULTS = (state, playload) => {
  state.results = playload
}

export const CLEAR_SAVED_RESULTS = (state) => {
  state.savedResults = []
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

export const CLEAR_ANONYMOUS_RESULT = (state) => {
  state.anonymousResults = []
}

export const SAVE_ANONYMOUS_RESULT = (state, playload) => {
  const idx = state.anonymousResults.findIndex(e => e.test === playload.test && e.part === playload.part && e.phase === playload.phase)
  if (idx >= 0) {
    state.anonymousResults = state.anonymousResults.splice(idx, 1, playload)
  } else {
    state.anonymousResults.push(playload)
  }
}

export const SET_ANONYMOUS_RESULT = (state, playload) => {
  state.anonymousResults = playload
}
