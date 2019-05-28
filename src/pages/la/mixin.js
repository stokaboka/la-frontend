import { mapGetters, mapMutations, mapActions } from 'vuex'

import TimerHelper from '../../lib/TimerHelper'
let timer = null
let audio = null

const nextState = {
  start: 'test',
  test: 'end',
  end: 'end'
}

const calculate = {
  one: (phase, category, answers, questionsCount = 0) => {
    let percent = 0
    const score = answers
      .filter(e => e.phase === phase && e.category === category)
      .filter(e => e.a > 0).length
    if (questionsCount > 0) {
      percent = Math.round(100 * score / questionsCount)
    }

    return { limit: 60, level: category, next: percent >= 60 }
  },

  two: (phase, category, answers, questionsCount = 0) => {
    let percent = 0
    const answer = answers.find(e => e.phase === phase && e.category === category)
    if (answer) {
      let score = answer.a
      if (answer.q > 0) {
        percent = Math.round(100 * score / answer.q)
      }

      const rules = [
        // category 1
        [
          { limit: 0, level: 0, next: false },
          { limit: 40, level: 1, next: false },
          { limit: 80, level: 2, next: false },
          { limit: 100, level: 2, next: true }
        ],

        // category 2
        [
          { limit: 0, level: 2, next: false },
          { limit: 40, level: 3, next: false },
          { limit: 80, level: 4, next: false },
          { limit: 100, level: 4, next: true }
        ],

        // category 3
        [
          { limit: 0, level: 4, next: false },
          { limit: 40, level: 5, next: false },
          { limit: 80, level: 6, next: false },
          { limit: 100, level: 6, next: true }
        ],

        // category 4
        [
          { limit: 0, level: 6, next: false },
          { limit: 40, level: 7, next: false },
          { limit: 80, level: 8, next: false },
          { limit: 100, level: 9, next: false }
        ]
      ]

      const rule = rules[category - 1]
      const out = rule.find(e => percent <= e.limit)
      return out
    }
    return { limit: 0, level: category, next: false }
  },

  tree: (phase, category, answers, questionsCount = 0) => {
    let percent = 0
    const score = answers
      .filter(e => e.phase === phase && e.category === category)
      .filter(e => e.a > 0).length
    if (questionsCount > 0) {
      percent = Math.round(100 * score / questionsCount)
    }
    const rules = [
      // category 1
      [
        { limit1: null, limit2: 20, level: 0, next: false },
        { limit1: 20, limit2: 60, level: 1, next: false },
        { limit1: 60, limit2: null, level: 2, next: true }
      ],

      // category 2
      [
        { limit1: null, limit2: 50, level: 2, next: false },
        { limit1: 50, limit2: 50, level: 3, next: false },
        { limit1: 50, limit2: null, level: 4, next: true }
      ],

      // category 3
      [
        { limit1: null, limit2: 50, level: 4, next: false },
        { limit1: 50, limit2: 50, level: 5, next: false },
        { limit1: 50, limit2: null, level: 6, next: true }
      ],

      // category 4
      [
        { limit1: null, limit2: 50, level: 6, next: false },
        { limit1: 50, limit2: 50, level: 7, next: false },
        { limit1: 50, limit2: null, level: 8, next: true }
      ]
    ]

    const rule = rules[category - 1]
    const out = rule.find(e => {
      if (e.limit1 === null) {
        return percent < e.limit2
      }
      if (e.limit2 === null) {
        return e.limit1 <= percent
      }
      if (e.limit1 === e.limit2) {
        return e.limit1 === percent
      }
      return e.limit1 <= percent && percent < e.limit2
    })
    return out
  }
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

    calculateResults () {
      const { phase, category } = this
      let result = null
      const func = calculate[this.module.id]
      if (func) {
        result = func(phase, category, this.answers, this.questionsCount)
        return result
      } else {
        return null
      }
    },

    onReady () {
      const result = this.calculateResults()
      if (result) {
        this.SET_LEVEL(result.level)

        if (result.next) {
          this.nextCategory()
          this.nextQuestion()
        } else {
          this.nextState()
        }
      } else {
        this.nextState()
      }
    },

    onAnswer (answer) {
      console.dir(answer)
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
      'SET_RIGHT_DRAWER'
    ]),
    ...mapMutations('test', [
      'SET_MODULE_TEST',
      'SET_ANSWER',
      // 'ADD_RESULT',
      'SET_LEVEL',
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
