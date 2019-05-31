import axios from 'axios'

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

export const SET_CLOSED = (state) => {
  if (state.user) {
    state.user.closed = 1
  }
}

export const SET_TOKEN = (state, token) => {
  state.token = token
  axios.defaults.headers.common['Authorization'] = state.token ? `Bearer ${state.token}` : ''
  sessionStorage.setItem('token', state.token)
}
