import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LaLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'auth',
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
          { path: 'signin', name: 'auth-signin', component: () => import('pages/auth/Signin') },
          { path: 'register', name: 'auth-register', component: () => import('pages/auth/Register') },
          { path: 'signout', name: 'auth-signout' }
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
