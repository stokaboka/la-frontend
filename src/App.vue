<template>
  <div id="q-app" class="app__background app__background-animation" :style="{ 'background-image': `url(${backgroundImage})` }">
    <router-view/>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import TimerHelper from './lib/TimerHelper'

let timer = null

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

    timer = new TimerHelper(this)
    timer
      // .on('START', this.onTimerFired)
      // .on('PAUSE', this.onTimerFired)
      // .on('RESUME', this.onTimerFired)
      // .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)
      .start(this.appBackgroundShowSeconds)
  },
  computed: {
    ...mapGetters('app', ['backgroundImage', 'appBackgroundShowSeconds']),
    ...mapGetters('users', ['isLogged', 'isAdmin', 'isOperator'])
  },
  methods: {
    changeBackgroundImage () {
      this.NEXT_BACKGROUND_IMAGE()
      timer.start(this.appBackgroundShowSeconds)
    },
    onTimerFired (event) {
      switch (event.event) {
        case 'COMPLETE':
          this.changeBackgroundImage()
          break
      }
    },
    ...mapMutations('app', ['NEXT_BACKGROUND_IMAGE']),
    ...mapActions('auth', ['signin']),
    ...mapActions('config', { loadConfig: 'load' })
  },
  beforeDestroy () {
    if (timer) {
      timer.stop()
      timer.off()
      timer = null
    }
  }
}
</script>

<style scoped>

  .app__background {
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  .app__background-animation {
    transition: background-image 1s ease-in-out;
  }
</style>
