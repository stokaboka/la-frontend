<template>
  <div>
    <div>
      <div v-if="state === 1">
        <p>У вас есть <strong>2 минуты</strong> до начала прослушивания, чтобы ознакомиться с вопросами</p>
        <p>Вы можете <q-btn @click="initState(2)">начать воспроизведение</q-btn> раньше.</p>
      </div>
      <div v-if="state === 2">
        <p>Просшлушайте трэк и выберите верные варианты ответов. Трэк повторяется два раза.</p>
      </div>
      <div v-if="state === 3">
        <p>Выберите верные варианты ответов и нажмите кнопку <q>Далее</q> внизу</p>
      </div>
    </div>
    <div v-for="question in data" :key="question.question">
      <multi-choice
        :data="question"
        orientation="H"
        :next="false"
        :hint="false"
        :shuffle="false"
        @input="onInput"
      ></multi-choice>
    </div>

    <q-btn v-if="showNext" label="Далее" color="primary" class="q-ma-md" @click="onNext" />
    <div v-if="showNext" class="text-grey-14">
      Если Вы не помните или не знаете ответа - просто нажмите кнопку <q>Далее</q>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MultiChoice from './MultiChoice'
import TimerHelper from '../../lib/TimerHelper'
import AudioHelper from '../../lib/AudioHelper'
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
      answer: null,
      state: 1,
      showNext: false
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
    audio.init(this.api, '/assets/sounds').theme('')
    audio.on('START', this.onAudioFired)
      .on('PROGRESS', this.onAudioFired)
      .on('COMPLETE', this.onAudioFired)

    // this.initState(1)
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
    ...mapGetters('test', ['time', 'timer'])
  },
  methods: {
    onInput (val) {
      console.dir(val)
      this.$emit('on-answer', val)
    },

    onNext () {
      this.$emit('on-ready')
    },

    initState (val) {
      this.state = val
      this.showNext = false
      timer.stop()
      audio.stop()
      this.RESET_TIMER()
      this.SHOW_AUDIO_CONTROLS(false)
      switch (this.state) {
        case 1 :
          timer.start(2 * 60)
          this.SET_TIMER_TOTAL(2 * 60)
          this.SET_TIMER_HINT('Осталось времени, чтобы ознакомиться с вопросами')
          break
        case 2 :
          const q = this.data.find(e => e.audio)
          if (q && q.audio) {
            audio.volume(this.volume).once().play(q.audio)
            this.SET_TIMER_HINT('Осталось времени до окончания аудио записи')
            this.SHOW_AUDIO_CONTROLS(true)
            this.SET_TIMER_TOTAL(0)
          }
          break
        case 3 :
          this.showNext = true
          timer.start(2 * 60)
          this.SET_TIMER_TOTAL(2 * 60)
          this.SET_TIMER_HINT('Осталось времени на ответ')
          break
      }
    },

    onAudioFired (event) {
      console.log(event)
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          if (this.timer.total === 0) {
            this.SET_TIMER_TOTAL(Math.round(event.duration))
          }
          this.SET_TIMER_TIME(Math.round(event.currentTime))
          this.showNext = event.currentTime > event.duration / 2
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
      'SHOW_AUDIO_CONTROLS'
    ]),
    ...mapMutations('test', [
      'SET_ANSWER',
      // 'ADD_RESULT',
      'ADD_SECOND_TO_TIMER',
      'RESET_TIMER',
      'SET_TIMER_TOTAL',
      'SET_TIMER_TIME',
      'SET_MODULE_TEST',
      'SET_TIMER_HINT'
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
