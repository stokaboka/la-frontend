<template>
  <div>
    <div class="text-grey-14">
      <div v-if="state === 1">
        <span v-html="groupMultiChoice.message[0]"></span>
        <p>{{groupMultiChoice.message[1]}}
          <q-btn :label="groupMultiChoice.buttons.play.label" color="warning" text-color="text-grey-14" @click="initState(2)"></q-btn>
        </p>
      </div>
      <div v-if="state === 2">
        <p>{{groupMultiChoice.message[2]}}</p>
      </div>
      <div v-if="state === 3">
        <p>{{groupMultiChoice.message[3]}}</p>
      </div>
    </div>
    <div v-for="question in data" :key="question.question">
      <multi-choice
        class="q-mt-md"
        :data="question"
        orientation="H"
        :next="false"
        :hint="false"
        :shuffle="false"
        @input="onInput"
      ></multi-choice>
    </div>

    <q-btn v-if="showNext" :label="laonecontainer.buttons.next.label" color="primary" class="q-mt-md" @click="onNext" />

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MultiChoice from './MultiChoice'
import TimerHelper from '../../../lib/TimerHelper'
import AudioHelper from '../../../lib/AudioHelper'
let timer = null
let audio = null

export default {
  name: 'GroupMultiChoice',
  components: { MultiChoice },
  props: {
    data: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      answers: [],
      state: 1
    }
  },
  mounted () {
    timer = new TimerHelper(this)
    timer
      .on('START', this.onTimerFired)
      .on('PAUSE', this.onTimerFired)
      .on('RESUME', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    audio = new AudioHelper(this.api, 'assets/sounds')
    // audio.init(this.api, 'assets/sounds').theme('')
    audio.init('statics', 'sounds').theme('')
    audio.volume(this.volume)
    audio.on('START', this.onAudioFired)
      .on('PROGRESS', this.onAudioFired)
      .on('COMPLETE', this.onAudioFired)
  },
  beforeDestroy () {
    if (timer) {
      timer.stop()
      timer.off()
      timer = null
    }
    if (audio) {
      audio.stop()
      audio.off()
      audio = null
    }
  },
  computed: {
    ...mapGetters('app', ['api', 'volume']),
    ...mapGetters('app', ['time', 'timer', 'showNext']),
    ...mapGetters('config', { partOneDebug: 'partOneDebug' }),
    ...mapGetters('text', ['laonecontainer', 'groupMultiChoice'])
  },
  methods: {
    onInput (answer) {
      const idx = this.answers.findIndex(e => e.q === answer.q)
      if (idx > -1) {
        this.answers.splice(idx, 1)
      }
      this.answers.push(answer)
    },

    onNext () {
      timer.stop()
      audio.stop()
      this.answers.forEach(e => {
        this.$emit('on-answer', e)
      }, this)
      this.$emit('on-ready')
    },

    initState (val) {
      this.state = val
      this.SET_SHOW_NEXT(false)
      timer.stop()
      audio.stop()
      this.RESET_TIMER()
      this.SHOW_AUDIO_CONTROLS(false)
      switch (this.state) {
        case 1 :
          timer.start(2 * 60)
          this.answers = []
          this.SET_TIMER_TOTAL(2 * 60)
          this.SET_TIMER_HINT(this.groupMultiChoice.timer[0])
          break
        case 2 :
          const q = this.data.find(e => e.audio)
          if (q && q.audio) {
            this.SET_SOUND_VOLUME(1)
            audio.volume(this.volume).once().play(q.audio)
            this.SET_TIMER_HINT(this.groupMultiChoice.timer[1])
            this.SHOW_AUDIO_CONTROLS(true)
            this.SET_TIMER_TOTAL(0)
          }
          break
        case 3 :
          this.SET_SHOW_NEXT(true)
          timer.start(2 * 60)
          this.SET_TIMER_TOTAL(2 * 60)
          this.SET_TIMER_HINT(this.groupMultiChoice.timer[2])
          break
      }
    },

    onAudioFired (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          if (this.state === 2) {
            if (this.timer.total === 0) {
              this.SET_TIMER_TOTAL(Math.round(event.duration))
            }
            this.SET_TIMER_TIME(Math.round(event.currentTime))
            if (this.partOneDebug) {
              this.SET_SHOW_NEXT(true)
            } else {
              this.SET_SHOW_NEXT(event.currentTime > event.duration / 2)
            }
          }
          break
        case 'COMPLETE' :
          this.SHOW_AUDIO_CONTROLS(false)
          this.initState(3)
      }
    },

    onTimerFired (event) {
      switch (event.event) {
        case 'START':
          this.RESET_TIMER()
          break
        case 'PAUSE':
          if (audio) {
            audio.pause()
          }
          break
        case 'RESUME':
          if (audio) {
            audio.resume()
          }
          break
        case 'PROGRESS':
          this.ADD_SECOND_TO_TIMER()
          break
        case 'COMPLETE':
          if (this.state === 1) {
            this.initState(2)
          }
          if (this.state === 3) {
            this.onNext()
          }
          break
      }
    },
    ...mapMutations('app', [
      'SET_SOUND_VOLUME',
      'SHOW_AUDIO_CONTROLS',
      'SET_ANSWER',
      // 'ADD_RESULT',
      'ADD_SECOND_TO_TIMER',
      'RESET_TIMER',
      'SET_TIMER_TOTAL',
      'SET_TIMER_TIME',
      'SET_TIMER_HINT',
      'SET_SHOW_NEXT'
    ])
  },

  watch: {
    volume (vol) {
      audio.volume(vol)
    },
    data (val) {
      this.initState(1)
    }
  }
}
</script>

<style></style>
