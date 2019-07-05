import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LaLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue'),
        beforeEnter (to, from, next) {
          store.commit('app/SET_MODE', 'about')
          if (to.name === 'home') {
            const isLogged = store.getters['users/isLogged']
            const isAdmin = store.getters['users/isAdmin']
            const isOperator = store.getters['users/isOperator']
            if (isLogged) {
              const name = isAdmin || isOperator ? 'part-two-home' : 'part-one-home'
              next({ name })
            } else {
              next()
            }
          }
        }
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
        path: 'admin',
        name: 'admin',
        component: () => import('layouts/LaLayout.vue'),
        beforeEnter (to, from, next) {
          store.commit('app/SET_MODE', 'admin')
          const isLogged = store.getters['users/isLogged']
          const isAdmin = store.getters['users/isAdmin']
          const isOperator = store.getters['users/isOperator']
          if (isLogged && (isAdmin || isOperator)) {
            next()
          } else {
            next({ name: 'home' })
          }
        },
        children: [
          {
            path: 'courses',
            name: 'admin-courses',
            component: () => import('pages/admin/CoursesPage')
          }
        ]
      }
    ]
  },
  {
    path: '/part-one',
    name: 'part-one',
    component: () => import('layouts/LaPartOneLayout.vue'),
    beforeEnter (to, from, next) {
      store.commit('app/SET_MODE', 'test')
      const isLogged = store.getters['users/isLogged']
      if (isLogged) {
        const isClosed = store.getters['users/isClosed']
        const name = (isClosed && to.name !== 'part-one-end') ? 'part-one-end' : ''
        if (name) {
          next({ name })
        } else {
          next()
        }
      } else {
        next({ name: 'home' })
      }
    },
    children: [
      {
        path: 'home',
        name: 'part-one-home',
        component: () => import('pages/PartOne')
      },
      {
        path: 'test',
        name: 'part-one-test',
        component: () => import('pages/laone/LaOneContainer.vue'),
        children: [
          {
            path: 'phase-one',
            name: 'part-one-phase-one',
            component: () => import('pages/laone/LaOne.vue'),
            meta: { break: true, title: true }
          },
          {
            path: 'phase-two',
            name: 'part-one-phase-two',
            component: () => import('pages/laone/LaTwo.vue'),
            meta: { break: true, title: true }
          },
          {
            path: 'phase-tree',
            name: 'part-one-phase-tree',
            component: () => import('pages/laone/LaTree.vue'),
            meta: { break: true, title: true }
          },
          {
            path: 'end',
            name: 'part-one-end',
            component: () => import('pages/laone/LaEnd.vue'),
            meta: { break: false, title: false }
          }
        ]
      }
    ]
  },
  {
    path: '/part-two',
    name: 'part-two',
    component: () => import('layouts/LaPartTwoLayout.vue'),
    beforeEnter (to, from, next) {
      store.commit('app/SET_MODE', 'admin')
      const isLogged = store.getters['users/isLogged']
      const isAdmin = store.getters['users/isAdmin']
      const isOperator = store.getters['users/isOperator']
      if (isLogged && (isAdmin || isOperator)) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    children: [
      {
        path: 'home',
        name: 'part-two-home',
        component: () => import('pages/PartTwo')
      },
      {
        path: 'users',
        name: 'part-two-users',
        component: () => import('pages/latwo/LaTwoUsers')
      },
      // {
      //   path: 'user-test',
      //   name: 'part-two-user-tests',
      //   component: () => import('pages/latwo/LaTwoUserAttempts')
      // },
      {
        path: 'user-results',
        name: 'part-two-user-results',
        component: () => import('pages/latwo/LaTwoUserResult')
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
