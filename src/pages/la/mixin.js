import { mapGetters, mapMutations, mapActions } from 'vuex'

import TimerHelper from '../../lib/TimerHelper'
let timer = null
let audio = null

const nextState = {
  start: 'test',
  test: 'end',
  end: 'end'
}

export default {
  data () {
    return {
      state: 'start'
    }
  },

  beforeDestroy () {
    if (timer) {
      timer.stop()
      timer.off()
      timer = null
    }
    if (audio) {
      audio.stop()
      audio = null
    }
  },

  methods: {
    breakTest () {
      this.$router.push({ name: 'home' })
    },

    nextState () {
      this.state = nextState[this.state]
    },

    nextPhase () {
      this.$router.push({ name: this.module.next })
    },

    initStartState () {
      this.SET_LEFT_DRAWER(false)
      this.SET_RIGHT_DRAWER(false)
    },

    initTestState () {
      timer = new TimerHelper(this)
      timer
        .on('START', this.onTimerFired)
        .on('PAUSE', this.onTimerFired)
        .on('RESUME', this.onTimerFired)
        .on('PROGRESS', this.onTimerFired)
        .on('COMPLETE', this.onTimerFired)

      this.SET_LEFT_DRAWER(true)
      this.SET_RIGHT_DRAWER(true)

      this.SET_TEST(1)
      this.SET_PART(this.part)
      this.SET_PHASE(this.phase)

      this.RESET_CATEGORY()
      this.initQuestionsTotalCount()
      this.initQuestions()
      this.startTimer()
    },

    initEndState () {
      this.SET_LEFT_DRAWER(false)
      this.SET_RIGHT_DRAWER(false)
      this.saveResults()
    },

    saveResults () {
      /**
       * TODO saveResults
       */
    },

    onAnswer (answer) {
      if (answer) {
        const { part, phase, category } = this
        this.ADD_ANSWER({
          ...answer,
          part,
          phase,
          category
        })
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
      if (
        this.category < this.maxCategory
      ) {
        this.NEXT_CATEGORY()
        this.initQuestions()
      } else {
        this.nextState()
      }
    },
    nextQuestion () {
      if (this.current < this.questionsCount - 1) {
        this.NEXT_QUESTION()
      } else {
        this.nextCategory()
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
          this.nextState()
          break
      }
    },

    startTimer () {
      const seconds = this.time
      if (seconds && seconds > 0) {
        this.SET_TIMER_TOTAL(seconds)
        timer.start(seconds)
      }
    },

    ...mapMutations('app', [
      'SET_MODULE',
      'SET_LEFT_DRAWER',
      'SET_RIGHT_DRAWER'
    ]),
    ...mapMutations('test', [
      'SET_MODULE_TEST',
      'ADD_ANSWER',
      'ADD_RESULT',
      'ADD_SECOND_TO_TIMER',
      'RESET_TIMER',
      'SET_TIMER_TOTAL'
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
    ...mapActions('questions', ['load', 'count'])
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('app', ['api', 'module', 'modules', 'lastModule']),
    ...mapGetters('test', [
      'short',
      'test',
      'part',
      'phase',
      'maxCategory',
      'answers',
      'results',
      'result',
      'time',
      'timer'
    ]),
    ...mapGetters('questions', [
      'question',
      'questions',
      'questionsCount',
      'current',
      'category'
    ])
  },

  watch: {
    state (val) {
      switch (val) {
        case 'start':
          this.initStartState()
          break
        case 'test':
          this.initTestState()
          break
        case 'end':
          this.initEndState()
          break
      }
    }
  }
}
