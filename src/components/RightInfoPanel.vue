<template>
  <div class="column justify-start items-center  q-pa-md">
    <q-circular-progress
      show-value
      font-size="16px"
      class="text-grey-14 q-ma-md"
      :value="value"
      size="7rem"
      :thickness="0.25"
      :color="colorTime"
      track-color="grey-3"
    >
      <q-icon name="access_time" size="2rem" class="q-mr-xs" :color="colorTime"/>
      {{ timerText }}
    </q-circular-progress>
    <span class="text-grey-14">
      Время выполнения теста: <strong>{{timeText}}</strong>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { secondsToTimeText, secondsToTimeTextLong } from '../lib/utils'

const progressColors = [
  { value: 90, color: 'red' },
  { value: 75, color: 'orange' },
  { value: 50, color: 'blue' },
  { value: 0, color: 'green' }
]

export default {
  name: 'RightInfoPanel',
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('test', ['time', 'timer']),
    timeText () {
      // const time = this.$store.getters[`${this.module.id}/time`]
      return secondsToTimeTextLong(this.time)
    },
    timerText () {
      // const timer = this.$store.getters[`${this.module.id}/timer`]
      return secondsToTimeText(this.timer)
    },
    colorTime () {
      const c = progressColors.find(e => this.value > e.value)
      return c ? c.color : 'green'
    },
    value () {
      // const time = this.$store.getters[`${this.module.id}/time`]
      if (this.time !== 0) {
        // const timer = this.$store.getters[`${this.module.id}/timer`]
        return Math.round(100 * this.timer / this.time)
      }
      return 0
    }
  }
}
</script>

<style>
</style>
