import AudioHelper from '../lib/AudioHelper'

export default ({ Vue }) => {
  Vue.prototype.$audioHelper = new AudioHelper()
}
