import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import config from './config'
import auth from './auth'
import test from './test'
import questions from './questions'
import results from './results'
import users from './users'
import editor from './editor'
import attempts from './attempts'
import description from './description'
import reports from './reports'

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
    config,
    auth,
    test,
    questions,
    results,
    users,
    editor,
    attempts,
    description,
    reports
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store
