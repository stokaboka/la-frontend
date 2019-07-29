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
      audio.off()
      audio = null
    }
  },

  methods: {
    breakTest () {
      this.$router.push({ name: 'home' })
    },

    logger (...args) {
      if (this.partOneDebug) {
        console.log(args)
      }
    },

    resetState () {
      this.state = 'start'
      this.initStartState()
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

      if (this.isAnonymous) {
        this.$q.notify({
          message: 'Результат анонимного пользователя не будет сохранен',
          color: 'warning',
          textColor: 'black'
        })
        this.saveAnonymousResults()
      } else {
        this.saveResults()
      }

      if (this.phase === this.lastPhase) {
        if (!this.isAnonymous) {
          this.fixUserAttempt()
        }

        this.$router.push({ name: 'part-one-end' })
      }
    },

    saveAnonymousResults () {
      const { test, part, phase, level } = this
      this.SAVE_ANONYMOUS_RESULT({ test, part, phase, level })
    },

    async saveResults () {
      const { id: idUser, attempt } = this.authUser
      const { test, part, phase, level } = this
      await this.save({
        idUser,
        attempt,
        test,
        part,
        phase,
        level,
        answers: '',
        extra: ''
      })
    },

    async fixUserAttempt () {
      await this.fixAttempt(this.authUser)
    },

    async onReady () {
      const result = await this.calculateResults()
      this.logger('onReady', result)

      if (result) {
        if (result.level > 0) {
          this.SET_LEVEL(result.level)
        }

        if (result.next.question) {
          this.nextQuestion()
        } else if (result.next.category) {
          this.nextCategory()
        } else if (result.next.state) {
          this.nextState()
        }
      } else {
        this.nextState()
      }
    },

    onAnswer (answer) {
      this.logger('onAnswer', answer.a, answer.aa, answer.q)

      if (answer) {
        const { part, phase, category } = this
        this.SET_ANSWER({
          ...answer,
          part,
          phase,
          category
        })

        if (!this.waitReady) {
          this.onReady()
        }
      }
    },
    async initQuestions () {
      await this.loadQuestions({
        test: this.questionTest,
        part: this.questionPart,
        phase: this.questionPhase,
        category: this.category
      })
    },
    async initQuestionsTotalCount () {
      await this.loadCountQuestions({
        test: this.questionTest,
        part: this.questionPart,
        phase: this.questionPhase
      })
    },
    nextCategory () {
      if (this.category < this.maxCategory) {
        this.NEXT_CATEGORY()
        this.initQuestions()
      } else {
        this.nextState()
      }
    },
    nextQuestion () {
      if (this.questionIndex < this.questionsCount - 1) {
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
      'SET_RIGHT_DRAWER',
      'SET_ANSWER',
      // 'ADD_RESULT',
      'SET_LEVEL',
      'ADD_SECOND_TO_TIMER',
      'RESET_TIMER',
      'SET_TIMER_TOTAL',
      'SET_SHOW_NEXT'
    ]),
    ...mapMutations('questions', [
      'SET_TEST',
      'SET_PART',
      'SET_PHASE',
      'SET_CATEGORY',
      'NEXT_CATEGORY',
      'RESET_CATEGORY',
      'NEXT_QUESTION',
      'CLEAR_QUESTIONS'
    ]),
    ...mapMutations('results', ['SAVE_ANONYMOUS_RESULT']),
    ...mapActions('users', ['fixAttempt']),
    ...mapActions('questions', { loadQuestions: 'load', loadCountQuestions: 'count' }),
    ...mapActions('results', ['calculateResults', 'save', 'saveAnonymous']),
    ...mapActions('description', { loadDescription: 'load' })
  },
  computed: {
    ...mapGetters('config', { partOneDebug: 'partOneDebug' }),
    ...mapGetters('users', ['isLogged', 'authUser', 'isAnonymous']),
    ...mapGetters('app', [
      'api', 'module', 'modules', 'lastModule',
      'description',
      'test',
      'part',
      'phase',
      'lastPhase',
      'maxCategory',
      'answers',
      'result',
      'level',
      'time',
      'timer',
      'waitReady'
    ]),
    ...mapGetters('questions', [
      'question',
      'questions',
      'questionsCount',
      'questionIndex',
      'questionTest',
      'questionPart',
      'questionPhase',
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
