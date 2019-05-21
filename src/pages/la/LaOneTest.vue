<template>
  <q-page padding>
    <div>
      <multi-choice :question="question" @on-answer="onAnswer"></multi-choice>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MultiChoice from '../../components/la/MultiChoice'

import TimerHelper from '../../lib/TimerHelper'
let timer = null
let audio = null

export default {
  name: 'LaOneTest',
  components: { MultiChoice },
  data () {
    return {}
  },
  beforeDestroy () {
    if (timer) {
      timer.stop()
      timer
        .off('START', this.onTimerFired)
        .off('PAUSE', this.onTimerFired)
        .off('RESUME', this.onTimerFired)
        .off('PROGRESS', this.onTimerFired)
        .off('COMPLETE', this.onTimerFired)

      timer = null
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

    this.SET_MODULE('one')

    this.SET_LEFT_DRAWER(true)
    this.SET_RIGHT_DRAWER(true)

    this.SET_TEST(1)
    this.SET_PART(1)
    this.SET_PHASE(1)

    this.RESET_CATEGORY()
    this.initQuestionsTotalCount()
    this.initQuestions()
  },
  methods: {
    onAnswer (answer) {
      if (answer) {
        const { part, phase, category } = this
        this.ADD_ANSWER({ ...answer, part, phase, category })
        this.ADD_RESULT(answer.a)
      }
      this.nextQuestion()
    },
    async initQuestions () {
      await this.load()
    },
    async initQuestionsTotalCount () {
      await this.count()
    },
    nextCategory () {
      if (this.category < this.maxCategory) {
        this.NEXT_CATEGORY()
        this.initQuestions()
      } else {
        this.route.push({ name: 'la-one-end' })
      }
    },
    nextQuestion () {
      if (this.current < this.total - 1) {
        this.NEXT_QUESTION()
      } else {
        this.nextCategory()
      }
    },
    onTimerFired (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PAUSE':
          if (audio) {
            audio.pause()
          }
          break
        case 'RESUME' :
          if (audio) {
            audio.resume()
          }
          break
        case 'PROGRESS' :
          break
        case 'COMPLETE' :
          this.doNextAction()
          break
      }
    },

    startTimer () {
      if (this.time && this.time > 0) {
        timer.start(this.time)
      }
    },
    ...mapMutations('app', [
      'SET_MODULE',
      'SET_LEFT_DRAWER',
      'SET_RIGHT_DRAWER'
    ]),
    ...mapMutations('questions', [
      'SET_TEST',
      'SET_PART',
      'SET_PHASE',
      'SET_CATEGORY',
      'NEXT_CATEGORY',
      'RESET_CATEGORY',
      'NEXT_QUESTION'
    ]),
    ...mapActions('questions', ['load', 'count']),
    ...mapMutations('one', ['ADD_ANSWER', 'ADD_RESULT'])
  },
  computed: {
    ...mapGetters('app', ['api']),
    ...mapGetters('one', ['maxCategory', 'time']),
    ...mapGetters('questions', [
      'question',
      'questions',
      'total',
      'current',
      'test',
      'part',
      'phase',
      'category'
    ])
  }
}
</script>

<style></style>
