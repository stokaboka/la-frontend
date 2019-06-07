export const SET_AUTH_USER = (state, playload = null) => {
  if (playload) {
    if (Array.isArray(playload) && playload.length > 0) {
      state.authUser = playload[0]
    } else {
      state.authUser = playload
    }
  } else {
    state.authUser = null
  }
}

export const CLEAR_USER = (state) => {
  state.authUser = null
}

export const SET_USER = (state, playload) => {
  state.user = playload
}

export const SET_USERS = (state, playload) => {
  state.users = playload
}

export const SET_CLOSED = (state) => {
  if (state.authUser) {
    state.authUser.closed = 1
  }
}

export const SET_USERS_TOTAL_COUNT = (state, playload) => {
  state.totalCount = playload
}
