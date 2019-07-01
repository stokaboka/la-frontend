import axios from 'axios'

export const load = ({ commit, getters }) => {
  return axios.get('client/config')
    .then(response => {
      console.log(response.data)
      commit('SET_CONFIG', response.data)
      return response.data
    })
    .catch(error => {
      console.log(error)
      console.log('config not found, use defaults')
      return null
    })
}
