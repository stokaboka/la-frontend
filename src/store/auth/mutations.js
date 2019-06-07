import axios from 'axios'

export const SET_TOKEN = (state, token) => {
  state.token = token
  axios.defaults.headers.common['Authorization'] = state.token ? `Bearer ${state.token}` : ''
  sessionStorage.setItem('token', state.token)
}
