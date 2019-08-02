<template>
  <div id="q-app" class="app__background-animation" :style="{ 'background-image': `url(${bgImage})` }">
    <router-view/>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import TimerHelper from './lib/TimerHelper'

let timer = null
let imageIndex = 0
const bgShowSeconds = 5
const imagesPath = 'statics/images/'
const images = [
  'london-1572444_1920.jpg',
  'bus-3913228_1920_1280.jpg',
  'capital-2653_1920_1280.jpg'
]

export default {
  name: 'App',
  data () {
    return {
      bgImage: `${imagesPath}${images[imageIndex]}`
    }
  },
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
      .start(bgShowSeconds)
  },
  computed: {
    ...mapGetters('users', ['isLogged', 'isAdmin', 'isOperator'])
  },
  methods: {
    nextAppStyle () {
      imageIndex = ++imageIndex % images.length
      this.bgImage = `${imagesPath}${images[imageIndex]}`
      timer.start(bgShowSeconds)
    },
    onTimerFired (event) {
      switch (event.event) {
        case 'COMPLETE':
          this.nextAppStyle()
          break
      }
    },
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
  .app__background-animation {
    transition: background-image 1s ease-in-out;
  }
</style>
