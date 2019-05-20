import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LaLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      {
        path: 'auth',
        name: 'auth',
        component: () => import('pages/auth/Auth.vue'),
        async beforeEnter (to, from, next) {
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
          const isLogged = store.getters['auth/isLogged']
          if (isLogged) {
            next()
          } else {
            next({ name: 'home' })
          }
        },
        children: [
          {
            path: 'one',
            name: 'la-one',
            component: () => import('pages/la/LaOne.vue')
          },
          {
            path: 'onetest',
            name: 'la-one-test',
            component: () => import('pages/la/LaOneTest.vue')
          },
          {
            path: 'two',
            name: 'la-two',
            component: () => import('pages/la/LaTwo.vue')
          },
          {
            path: 'tree',
            name: 'la-tree',
            component: () => import('pages/la/LaTree.vue')
          }
        ]
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
