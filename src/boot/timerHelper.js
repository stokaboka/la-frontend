import TimerHelper from '../lib/TimerHelper'

export default ({ Vue }) => {
  Vue.prototype.$timerHelper = new TimerHelper()
}
