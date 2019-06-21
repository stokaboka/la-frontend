export const SET_DESCRIPTION = (state, playload) => {
  state.description = playload.sort((a, b) => {
    if (a.part - b.part === 0) {
      return a.phase - b.phase
    }
    return a.part - b.part
  })
}
