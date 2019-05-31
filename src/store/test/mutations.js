export const SET_MODULE_TEST = (state, playload) => {
  const test = state.tests.find(e => e.id === playload)
  if (test) {
    state.test = test
  }
}

export const SET_ANSWER = (state, playload) => {
  if (state.test) {
    const idx = state.test.answers.findIndex(e => {
      return (
        e.part === playload.part &&
        e.phase === playload.phase &&
        e.category === playload.category &&
        e.q === playload.q
      )
    })

    if (idx > -1) {
      state.test.answers.splice(idx, 1)
    }

    state.test.answers.push(playload)
  }
}

export const SET_LEVEL = (state, playload) => {
  if (state.test) {
    state.test.level = playload
  }
}

export const ADD_SECOND_TO_TIMER = state => {
  state.timer.time++
}

export const SET_TIMER_TIME = (state, playload) => {
  state.timer.time = playload
}

export const RESET_TIMER = state => {
  state.timer.time = 0
}

export const SET_TIMER_TOTAL = (state, playload) => {
  state.timer.total = playload
}

export const SET_TIMER_HINT = (state, playload) => {
  state.timerHint = playload
}

export const SET_SHOW_NEXT = (state, playload) => {
  state.showNext = playload
}
