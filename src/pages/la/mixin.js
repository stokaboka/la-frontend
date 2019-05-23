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
      timer
        .off('START', this.onTimerFired)
        .off('PAUSE', this.onTimerFired)
        .off('RESUME', this.onTimerFired)
        .off('PROGRESS', this.onTimerFired)
        .off('COMPLETE', this.onTimerFired)

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

      this.SET_MODULE('one')

      this.SET_LEFT_DRAWER(true)
      this.SET_RIGHT_DRAWER(true)

      this.SET_TEST(1)
      this.SET_PART(1)
      this.SET_PHASE(1)

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

    onAnswer (answer) {
      if (answer) {
        const { part, phase, category } = this
        this.$store.commit(`${this.module.id}/ADD_ANSWER`, {
          ...answer,
          part,
          phase,
          category
        })
        this.$store.commit(`${this.module.id}/ADD_RESULT`, answer.a)
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
      if (this.category < this.$store.getters[`${this.module.id}/maxCategory`]) {
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
      console.log(event.event)
      switch (event.event) {
        case 'START':
          this.$store.commit(`${this.module.id}/RESET_TIMER`)
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
          this.$store.commit(`${this.module.id}/ADD_SECOND_TO_TIMER`)
          break
        case 'COMPLETE':
          this.nextState()
          break
      }
    },

    startTimer () {
      const seconds = this.$store.getters[`${this.module.id}/time`]
      if (seconds && seconds > 0) {
        timer.start(seconds)
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
    ...mapActions('questions', ['load', 'count'])
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('app', ['api', 'module', 'modules']),
    ...mapGetters('questions', [
      'question',
      'questions',
      'questionsCount',
      'current',
      'test',
      'part',
      'phase',
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
