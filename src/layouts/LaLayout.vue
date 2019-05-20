<template>
<q-layout view="hHh lpR fFf">
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <q-toolbar-title>
        {{title}}
      </q-toolbar-title>

      <span v-if="user">{{user.firstName}} {{user.secondName}} {{user.lastName}}</span>

      <q-tabs v-model="selectedTab" active-color="white">

        <q-route-tab :to="{name: 'home'}" default hide="label" icon="home" label="Главная" name="about" replace
        ></q-route-tab>

        <user-log-in-out-button color="dark" name="login"></user-log-in-out-button>

      </q-tabs>

    </q-toolbar>
  </q-header>

  <q-drawer v-model="left" side="left" elevated>
    <left-drawer :module="module"></left-drawer>
  </q-drawer>

  <q-drawer v-model="right" side="right" elevated>
  </q-drawer>

  <q-page-container>
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutDown"
      mode="out-in"
    >
      <router-view />
    </transition>
  </q-page-container>

  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
        {{title}}
    </q-toolbar>
  </q-footer>

</q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import UserLogInOutButton from 'components/ui/auth/UserLogInOutButton'
import LeftDrawer from '../components/LeftDrawer'

export default {
  name: 'LaLayout',
  components: { LeftDrawer, UserLogInOutButton },
  data () {
    return {
      selectedTab: 'about'
    }
  },
  methods: {
  },
  computed: {
    left: {
      get: function () {
        return this.leftDrawer
      },
      set: function (v) {}
    },
    right: {
      get: function () {
        return this.rightDrawer
      },
      set: function (v) {}
    },
    ...mapGetters('auth', ['isLogged', 'isAdmin', 'isOperator', 'isUser', 'user']),
    ...mapGetters('app', ['title', 'leftDrawer', 'rightDrawer', 'module'])
  }
}
</script>

<style scoped>
  .img-logo {
    width: 100%;
    height: auto;
  }
</style>
