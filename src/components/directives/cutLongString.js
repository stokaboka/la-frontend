import Vue from 'vue'

export const CutLongString = {
  componentUpdated: function (el, binding, vnode) {
    if (binding.value) {
      if (el.innerHTML && el.innerHTML.length > binding.value) {
        el.innerHTML = el.innerHTML.substr(0, binding.value) + ' ...'
      }
    }
  }
}

Vue.directive('cut-long-string', CutLongString)
