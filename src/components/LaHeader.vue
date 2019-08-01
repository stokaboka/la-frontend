<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar class="bg-white text-blue-grey-14">
      <img
        src="~assets/svs_logo.png"
        class="img-logo__anim"
        :class="[
            { 'img-logo__normal': mode === 'about' },
            { 'img-logo__small': mode !== 'about' },
          ]"
      />

      <q-toolbar-title>
        <strong>{{about.title}}</strong>
        <span class="q-ml-md text-subtitle2">v{{version}}</span>
        <div v-if="showTestTitle" class="text-body1 text-blue-grey-14 text-weight-medium">
          {{testTitle}} <strong>{{testDescription}}</strong>
        </div>
      </q-toolbar-title>

      <q-chip v-if="authUser" class="shadow-2">
        <q-avatar icon="person" color="blue-grey" text-color="white" />
        <strong>
          <span>{{ authUser.firstName }} {{ authUser.secondName }} {{ authUser.lastName }}</span>
        </strong>
        <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
          {{header.toolbar.authUser.tooltip}}
        </q-tooltip>
      </q-chip>

      <q-tabs v-model="selectedTab" inline-label active-color="primary">
        <q-route-tab
          :to="{ name: 'home' }"
          default
          hide="label"
          icon="home"
          :label="header.tabs.home"
          name="about"
          replace
        ></q-route-tab>

        <q-route-tab
          v-if="adminMode"
          :to="{ name: 'part-two-users' }"
          default
          hide="label"
          icon="people"
          :label="header.tabs.users"
          name="part-two-users"
          replace
        ></q-route-tab>

        <q-btn-dropdown v-if="adminMode" auto-close stretch flat icon="build" label="Инструменты">
          <q-list link>

            <q-item v-for="menuAdmin in menu.admin" :key="menuAdmin.route.name" clickable :to="menuAdmin.route">
              <q-item-section avatar>
                <q-icon :name="menuAdmin.icon" />
              </q-item-section>
              <q-item-section>{{menuAdmin.label}}</q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>

        <user-log-in-out-button
          color="dark"
          name="login"
        ></user-log-in-out-button>
      </q-tabs>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters } from 'vuex'
import UserLogInOutButton from './ui/auth/UserLogInOutButton'

export default {
  name: 'LaHeader',
  components: { UserLogInOutButton },
  data () {
    return {
      selectedTab: 'about',
      menu: {
        admin: [
          {
            id: 'part-one-home',
            label: 'Фаза I+++',
            icon: 'play_circle_outline',
            route: { name: 'part-one-home' }
          },
          {
            id: 'admin-courses',
            label: 'Учебные куурсы',
            icon: 'ballot',
            route: { name: 'admin-courses' }
          },
          {
            id: 'admin-questions',
            label: 'Вопросы тестов',
            icon: 'edit',
            route: { name: 'admin-questions' }
          }
        ]
      }
    }
  },
  mounted () {
    this.menu.admin = this.menu.admin.map(e => {
      if (this.header.menu[e.id]) {
        const label = this.header.menu[e.id]
        return { ...e, label }
      }
      return e
    })
  },
  computed: {
    testTitle () {
      return this.header.modules[this.module.id] ? this.header.modules[this.module.id].title : ''
    },
    testDescription () {
      return this.header.modules[this.module.id] ? this.header.modules[this.module.id].description : ''
    },
    showTitle () {
      return this.$route.meta.title
    },
    showTestTitle () {
      return this.showTitle && this.mode === 'test' && module !== null
    },
    adminMode () {
      return this.isLogged && (this.isAdmin || this.isOperator)
    },
    ...mapGetters('users', [
      'isLogged',
      'isAdmin',
      'isOperator',
      'isUser',
      'authUser'
    ]),
    ...mapGetters('app', ['title', 'mode', 'version', 'leftDrawer', 'rightDrawer', 'module']),
    ...mapGetters('attempts', { attempt: 'attempt' }),
    ...mapGetters('text', ['about', 'header'])
  }
}
</script>

<style scoped>
  .img-logo__normal {
    width: 176px;
    height: auto;
  }
  .img-logo__small {
    width: 88px;
    height: auto;
  }
  .img-logo__anim {
    transition: height, width ease 300ms;
  }

  .part-title__border {
    border-bottom: 2px solid #027BE3;
  }
</style>
