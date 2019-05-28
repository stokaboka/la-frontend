export const SET_QUESTIONS = (state, playload) => {
  state.questions = playload.sort(() => Math.random() - 0.5)
}

export const SET_PHASE_QUESTIONS_COUNT = (state, playload) => {
  state.phaseQuestionsTotal = playload
}

export const NEXT_QUESTION = (state, playload) => {
  if (state.questionIndex < state.questions.length - 1) {
    state.questionIndex++
  }
}

export const SET_TEST = (state, playload) => {
  state.test = playload
}

export const SET_PART = (state, playload) => {
  state.part = playload
}

export const SET_PHASE = (state, playload) => {
  state.phase = playload
}

export const SET_CATEGORY = (state, playload) => {
  state.category = playload
}

export const NEXT_CATEGORY = (state, playload) => {
  state.category++
}

export const RESET_CATEGORY = (state, playload) => {
  state.category = 1
}

export const SET_QUESTION_INDEX = (state, playload) => {
  state.questionIndex = playload
}
