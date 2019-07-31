<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  async mounted () {
    await this.loadConfig()
    await this.signin()
    let name = 'home'
    if (this.isLogged) {
      name = this.isAdmin || this.isOperator ? 'part-two-home' : 'part-one-home'
    }
    this.$router.push({ name })
  },
  computed: {
    ...mapGetters('users', ['isLogged', 'isAdmin', 'isOperator'])
  },
  methods: {
    ...mapActions('auth', ['signin']),
    ...mapActions('config', { loadConfig: 'load' })
  }
}
</script>

<style></style>
