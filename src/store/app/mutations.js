export function SET_LEFT_DRAWER (state, playload) {
  state.leftDrawer = playload
}

export function SET_RIGHT_DRAWER (state, playload) {
  state.rightDrawer = playload
}

export function SET_MODULE (state, playload) {
  const nextModule = state.modules.find(e => e.id === playload)
  if (nextModule) {
    state.module = nextModule
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
