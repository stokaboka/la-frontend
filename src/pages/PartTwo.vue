<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">
      <la-about/>
    </div>
  </q-page>
</template>

<script>
import LaAbout from '../components/LaAbout'
export default {
  name: 'PhaseTwo',
  components: { LaAbout },
  data () {
    return {
      drawer: true,
      miniState: true
    }
  },

  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mini-slot
    transition background-color .28s
    &:hover
      background-color rgba(0, 0, 0, .04)

  .mini-icon
    font-size 1.718em

    & + &
      margin-top 18px
</style>
