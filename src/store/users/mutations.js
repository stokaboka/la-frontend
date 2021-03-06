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

export const CLEAR_AUTH_USER = (state) => {
  state.authUser = null
}

export const SET_USER = (state, playload) => {
  state.user = playload
  if (state.users && Array.isArray(state.users)) {
    state.users = state.users.map(e => e.id === playload.id ? playload : e)
  }
}

export const SET_USER_IN_USERS = (state, playload) => {
  if (state.users && Array.isArray(state.users) && state.users.length > 0) {
    state.users = state.users.map(e => e.id === playload.id ? playload : e)
  } else {
    state.users = [playload]
  }
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

export const SET_ANONYMOUS_USER = (state) => {
  state.authUser = state.anonymous
}
