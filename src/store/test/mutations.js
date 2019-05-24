export const SET_MODULE_TEST = (state, playload) => {
  const test = state.tests.find(e => e.id === playload)
  if (test) {
    state.current = test
  }
}

export const ADD_ANSWER = (state, playload) => {
  if (state.current) {
    state.current.answers.push(playload)
  }
}

export const ADD_RESULT = (state, playload) => {
  if (state.current) {
    state.current.results.push(playload)
  }
}

export const ADD_SECOND_TO_TIMER = (state) => {
  state.timer++
}

export const RESET_TIMER = (state) => {
  state.timer = 0
}
