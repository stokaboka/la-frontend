<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated>
    <q-toolbar>

      <q-toolbar-title>
        {{title}}
      </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>

      <span v-if="user">{{user.firstName}} {{user.secondName}} {{user.lastName}}</span>

      <q-tabs v-model="selectedTab" active-color="white">
        <q-route-tab :to="{name: 'home'}" default hide="label" icon="home" label="Главная" name="about" replace
        ></q-route-tab>
        <user-log-in-out-button color="dark" name="login"></user-log-in-out-button>

      </q-tabs>

    </q-toolbar>
  </q-header>

  <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view />
    </transition>
  </q-page-container>
</q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import UserLogInOutButton from 'components/ui/auth/UserLogInOutButton'

export default {
  name: 'LaLayout',
  components: { UserLogInOutButton },
  data () {
    return {
      selectedTab: 'about'
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'isAdmin', 'isOperator', 'isUser', 'user']),
    ...mapGetters('app', ['title'])
  }
}
</script>

<style>
</style>
