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

export function apiVersion (state) {
  return state.apiVersion
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

export const test = s => s.test
export const mode = s => s.mode

export const volume = s => s.volume
export const showAudioControls = s => s.showAudioControls

export const testTitle = s => s.module ? s.module.title : ''
export const description = s => s.module ? s.module.description : ''
export const part = s => s.module ? s.module.part : 0
export const phase = s => s.module ? s.module.phase : 0
export const maxCategory = s => s.module ? s.module.maxCategory : 0
export const answers = s => s.module ? s.module.answers : []
export const result = s =>
  s.module
    ? s.module.answers
      .filter(e => e.phase === s.module.phase)
      .filter(e => e.a > 0)
      .length
    : 0

export const level = s => s.module ? s.module.level : 0

export const time = s => s.module ? s.module.time : 0
export const timer = s => s.timer
export const timerHint = s => s.timerHint

export const waitReady = s => s.module ? s.module.waitReady : false

export const showNext = s => s.showNext

export const lastPhase = s => s.lastPhase

export const testState = s => s.testState
