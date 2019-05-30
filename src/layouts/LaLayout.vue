<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-white text-blue-grey-14">
        <img
          src="~assets/svs_logo.png"
          class="img-logo__anim"
          :class="[
            { 'img-logo__normal': mode === 'about' },
            { 'img-logo__small': mode === 'test' }
          ]"
        />

        <q-toolbar-title>
          <strong>Language Assessment©</strong>
        </q-toolbar-title>

        <span v-if="user"
          >{{ user.firstName }} {{ user.secondName }} {{ user.lastName }}</span
        >

        <q-tabs v-model="selectedTab" active-color="primary">
          <q-route-tab
            :to="{ name: 'home' }"
            default
            hide="label"
            icon="home"
            label="Главная"
            name="about"
            replace
          ></q-route-tab>

          <user-log-in-out-button
            color="dark"
            name="login"
          ></user-log-in-out-button>
        </q-tabs>
      </q-toolbar>
    </q-header>

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
        {{ title }}
      </q-toolbar>
    </q-footer>
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
  methods: {},
  computed: {
    ...mapGetters('auth', [
      'isLogged',
      'isAdmin',
      'isOperator',
      'isUser',
      'user'
    ]),
    ...mapGetters('app', ['title', 'mode', 'leftDrawer', 'rightDrawer', 'module'])
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
  transition: height, width ease 0.5s;
}
</style>
