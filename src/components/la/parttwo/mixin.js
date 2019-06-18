import { mapActions, mapGetters, mapMutations } from 'vuex'
import { findMinElement, findMinElementIndex } from '../../../lib/utils'
import { categories, selfTestLevels } from './constants'

export default {
  data () {
    return {
      results: null,
      descriptions: null,
      levelOne: 0,
      levelTwo: 0,
      levelOneByCategory: 0,
      levelOneByCategoryID: 0
    }
  },
  computed: {
    ...mapGetters('users', ['user']),
    ...mapGetters('results', ['savedResults']),
    ...mapGetters('attempts', ['attempt']),
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
  methods: {
    async initQuestions () {
      await this.loadQuestions({
        test: this.questionTest,
        part: 2,
        phase: this.levelOneByCategoryID
      })
    },
    getPartPhaseLevel (part, phase) {
      if (this.results) {
        const phaseObj = this.results.find(
          e => e.part === part && e.phase === phase
        )
        if (phaseObj) return phaseObj.level
      }
      return 0
    },
    async initResults () {
      const { id } = this.user
      const { attempt } = this.attempt
      this.results = await this.loadResults({ id, attempt })

      this.levelOne = this.calcResultsPart(1)
      this.levelTwo = this.calcResultsPart(2)
      this.levelOneByCategory = this.calcLevelOneByCategory(this.levelOne)
      this.levelOneByCategoryID = this.calcLevelOneByCategoryID(
        this.levelOneByCategory
      )
    },
    async initDescriptions () {
      this.descriptions = await this.loadDescription({
        test: this.attempt.test,
        results: this.results
      }).then(data =>
        data.map(e => {
          const category = Object.values(categories).find(
            ee => ee.part === e.part && ee.phase === e.phase
          )
          if (category) return { ...e, ...category }
          return e
        })
      )
    },
    showLevels () {
      this.matrix = this.matrix.map(e => {
        if (e.target) {
          e.rows = e.rows.map(row => {
            const minIdx = findMinElementIndex(row, this[e.target], 'value')
            return row.map((item, itemIdx) => {
              return {
                ...item,
                ...{
                  class:
                    itemIdx === minIdx
                      ? 'bg-red text-white text-weight-bold shadow-2'
                      : ''
                }
              }
            }, this)
          }, this)
        }
        if (e.source) {
          e.rows = e.rows.map(row => {
            return row.map(item => {
              return { ...item, value: this[e.source] }
            }, this)
          }, this)
        }
        return { ...e }
      })
    },
    calcResultsPart (part) {
      return this.results
        .filter(e => e.part === part)
        .reduce((acc, e) => acc + e.level, 0)
    },
    calcLevelOneByCategory (levelOne) {
      const obj = findMinElement(selfTestLevels, levelOne)
      if (obj) return obj
      return 0
    },
    calcLevelOneByCategoryID (levelOneByCategory) {
      if (levelOneByCategory >= 1 && levelOneByCategory < 9) return 1
      if (levelOneByCategory >= 9 && levelOneByCategory < 15) return 2
      if (levelOneByCategory >= 15 && levelOneByCategory < 21) return 3
      return 4
    },
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
    ...mapActions('results', { loadResults: 'load' }),
    ...mapActions('description', { loadDescription: 'load' }),
    ...mapActions('questions', { loadQuestions: 'load', loadCountQuestions: 'count' })
  }
}
