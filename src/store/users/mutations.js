export const SET_USER = (state, playload = null) => {
  if (playload) {
    if (Array.isArray(playload) && playload.length > 0) {
      state.user = playload[0]
    } else {
      state.user = playload
    }
  } else {
    state.user = null
  }
}

export const CLEAR_USER = (state) => {
  state.user = null
}

export const SET_USERS = (state, playload) => {
  state.users = playload
}

export const SET_CLOSED = (state) => {
  if (state.user) {
    state.user.closed = 1
  }
}

export const SET_USERS_TOTAL_COUNT = (state, playload) => {
  state.totalCount = playload
}
