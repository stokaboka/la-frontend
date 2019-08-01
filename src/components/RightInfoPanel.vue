<template>
  <div class="column justify-start items-center q-gutter-md q-pa-md">

    <q-circular-progress
      show-value
      font-size="16px"
      class="text-grey-14"
      :value="value"
      size="7rem"
      :thickness="0.3"
      :color="colorTime"
      track-color="grey-4"
    >
      <q-icon name="access_time" size="2rem" class="q-mr-xs" :color="colorTime"/>
      {{ timerText }}
    </q-circular-progress>

    <div class="text-center">{{timerHint}}</div>

    <div v-if="time > 0" class="text-grey-14">
      {{info.right.totalTime}} <strong>{{timeText}}</strong>
    </div>

    <div v-if="showAudioControls" class="q-mt-lg">
      <sound-level :volume="volume" @input="onSoundLevelInput"></sound-level>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { secondsToTimeText, secondsToTimeTextLong } from '../lib/utils'
import SoundLevel from './ui/SoundLevel'

const progressColors = [
  { value: 10, color: 'red' },
  { value: 25, color: 'orange' },
  { value: 50, color: 'blue' },
  { value: 100, color: 'green' }
]

export default {
  name: 'RightInfoPanel',
  components: { SoundLevel },
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    onSoundLevelInput (val) {
      this.SET_SOUND_VOLUME(val)
    },
    ...mapMutations('app', ['SET_SOUND_VOLUME'])
  },
  computed: {
    ...mapGetters('app', ['showAudioControls', 'volume', 'time', 'timer', 'timerHint']),
    ...mapGetters('text', ['info']),
    timeText () {
      return secondsToTimeTextLong(this.timer.total)
    },
    timerText () {
      return secondsToTimeText(this.timer.total - this.timer.time)
    },
    colorTime () {
      const c = progressColors.find(e => this.value < e.value)
      return c ? c.color : 'green'
    },
    value () {
      if (this.timer.total !== 0) {
        return Math.round(100 * (this.timer.total - this.timer.time) / this.timer.total)
      }
      return 0
    }
  }
}
</script>

<style>
</style>
