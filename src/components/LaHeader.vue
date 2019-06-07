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
        <strong>Language Assessment©</strong>
        <div v-if="showTestTitle" class="text-h6 text-blue-grey-14 text-weight-medium">
          {{testTitle}} <strong>{{description}}</strong>
        </div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import UserLogInOutButton from './ui/auth/UserLogInOutButton'

export default {
  name: 'LaHeader',
  components: { UserLogInOutButton },
  data () {
    return {
      selectedTab: 'about'
    }
  },
  computed: {
    showTitle () {
      return this.$route.meta.title
    },
    showTestTitle () {
      return this.showTitle && this.mode === 'test'
    },
    ...mapGetters('users', [
      'isLogged',
      'isAdmin',
      'isOperator',
      'isUser',
      'user'
    ]),
    ...mapGetters('app', ['title', 'mode', 'leftDrawer', 'rightDrawer', 'module', 'testTitle', 'description'])
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
