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

<style>

  body {
    margin: 0;
    padding: 0;
  }

  body:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: whitesmoke;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(10px);
  }

  .form {
    padding: 2rem;
    border-radius: 1rem;
  }
  .form-white {
    background-color: white;
  }
  .form-transparent {
    background: rgba(0,0,0,0.6);
  }

  .wrapper {
    max-width: 60vw;
  }

  q {
    quotes: "\00ab" "\00bb";
  }

</style>
