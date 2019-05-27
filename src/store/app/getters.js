export function title (state) {
  return state.title
}

export function leftDrawer (state) {
  return state.leftDrawer
}

export function rightDrawer (state) {
  return state.rightDrawer
}

export function module (state) {
  return state.module
}

export function modules (state) {
  return state.modules
}

export function lastModule (state) {
  if (!state.module) {
    return false
  }
  const idx = state.modules.findIndex(e => e.id === state.module.id)
  return idx === state.modules.length - 1
}

export function version (state) {
  return state.version
}

export function api (state) {
  return state.api
}

export function allowResume (state) {
  return state.allowResume
}

export function allowCancel (state) {
  return state.allowCancel
}

export function lockResume (state) {
  return state.lockResume
}

export const volume = s => s.volume
export const showAudioControls = s => s.showAudioControls
