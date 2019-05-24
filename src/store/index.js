import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import auth from './auth'
import one from './one'
import test from './test'
import questions from './questions'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// export default function (/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       app,
//       auth
//     }
//   })
//
//   return Store
// }

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    one,
    test,
    questions
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
