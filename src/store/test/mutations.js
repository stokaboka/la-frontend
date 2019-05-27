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
  state.timer.time++
}

export const SET_TIMER_TIME = (state, playload) => {
  state.timer.time = playload
}

export const RESET_TIMER = (state) => {
  state.timer.time = 0
}

export const SET_TIMER_TOTAL = (state, playload) => {
  state.timer.total = playload
}

export const SET_TIMER_HINT = (state, playload) => {
  state.timerHint = playload
}
