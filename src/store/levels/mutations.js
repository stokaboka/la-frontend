export const SET_LEVEL = (state, playload) => {
  if (playload) {
    state.level = playload
  } else {
    state.level = null
  }
}
