export function SET_LEFT_DRAWER (state, playload) {
  state.leftDrawer = playload
}

export function SET_RIGHT_DRAWER (state, playload) {
  state.rightDrawer = playload
}

export function SET_MODULE (state, playload) {
  const module = state.modules.find(e => e.id === playload)
  if (module) {
    state.module = module
  }
}

export const SET_MODE = (state, playload) => {
  state.mode = playload
}

export const SET_SOUND_VOLUME = (state, playload) => {
  state.volume = playload
}

export const SHOW_AUDIO_CONTROLS = (state, playload) => {
  state.showAudioControls = playload
}

export const SET_ANSWER = (state, playload) => {
  if (state.module) {
    const idx = state.module.answers.findIndex(e => {
      return (
        e.part === playload.part &&
        e.phase === playload.phase &&
        e.category === playload.category &&
        e.q === playload.q
      )
    })

    if (idx > -1) {
      state.module.answers.splice(idx, 1)
    }

    state.module.answers.push(playload)
  }
}

export const SET_LEVEL = (state, playload) => {
  if (state.module) {
    state.module.level = playload
  }
}

export const RESET_MODULES = (state) => {
  state.modules = state.modules.map(e => {
    return {
      ...e,
      answers: [],
      results: [],
      level: 0
    }
  })

  state.module = ''
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

// *******************
export function SET_ALLOW_RESUME (state, playload) {
  state.allowResume = playload
}

export function SET_ALLOW_CANCEL (state, playload) {
  state.allowCancel = playload
}

export function SET_LOCK_RESUME (state, playload) {
  state.lockResume = playload
}
