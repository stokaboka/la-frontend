import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LaLayout.vue'),
    children: [
      { path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
        beforeEnter (to, from, next) {
          store.commit('app/SET_MODE', 'about')
          if (to.name === 'home') {
            const isLogged = store.getters['auth/isLogged']
            const isAdmin = store.getters['auth/isAdmin']
            const isOperator = store.getters['auth/isOperator']
            if (isLogged) {
              const name = (isAdmin || isOperator) ? 'phase-two' : 'phase-one'
              next({ name })
            } else {
              next()
            }
          }
        }
      },
      {
        path: 'phase-one',
        name: 'phase-one',
        component: () => import('pages/PhaseOne')
      },
      {
        path: 'phase-two',
        name: 'phase-two',
        component: () => import('pages/PhaseTwo')
      },
      {
        path: 'auth',
        name: 'auth',
        component: () => import('pages/auth/Auth.vue'),
        async beforeEnter (to, from, next) {
          store.commit('app/SET_MODE', 'about')

          if (to.name === 'auth-signout') {
            await store.dispatch('auth/signout')
            next({ name: 'home' })
          } else {
            next()
          }
        },
        children: [
          {
            path: 'signin',
            name: 'auth-signin',
            component: () => import('pages/auth/Signin')
          },
          {
            path: 'register',
            name: 'auth-register',
            component: () => import('pages/auth/Register')
          },
          { path: 'signout', name: 'auth-signout' }
        ]
      },
      {
        path: 'la',
        name: 'la',
        component: () => import('pages/la/La.vue'),
        beforeEnter (to, from, next) {
          store.commit('app/SET_MODE', 'test')
          const isLogged = store.getters['auth/isLogged']
          if (isLogged) {
            const isClosed = store.getters['auth/isClosed']
            if (isClosed) {
              next({ name: 'la-end' })
            } else {
              next()
            }
          } else {
            next({ name: 'home' })
          }
        },
        children: [
          {
            path: 'one',
            name: 'la-one',
            component: () => import('pages/la/LaOne.vue'),
            meta: { break: true, title: true }
          },
          {
            path: 'two',
            name: 'la-two',
            component: () => import('pages/la/LaTwo.vue'),
            meta: { break: true, title: true }
          },
          {
            path: 'tree',
            name: 'la-tree',
            component: () => import('pages/la/LaTree.vue'),
            meta: { break: true, title: true }
          }
        ]
      },
      {
        path: 'end',
        name: 'la-end',
        component: () => import('pages/la/LaEnd.vue'),
        meta: { break: false, title: false }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
