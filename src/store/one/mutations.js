export const ADD_ANSWER = (state, playload) => {
  state.answers.push(playload)
}

export const ADD_RESULT = (state, playload) => {
  state.results.push(playload)
}

export const ADD_SECOND_TO_TIMER = (state) => {
  state.timer++
}

export const RESET_TIMER = (state) => {
  state.timer = 0
}
