<template>
  <div>
    <div class="row q-gutter-md">
      <q-btn
        icon="first_page"
        color="secondary"
        label="Начать сначала"
        @click="restartLevelTwoByCategory"
      ></q-btn>
      <q-btn
        icon="chevron_left"
        color="grey"
        label="Назад"
        :disabled="levelTwoByCategoryID === 1"
        @click="prevLevelTwoByCategory"
      ></q-btn>
      <q-banner rounded class="bg-orange text-white"
        ><span class="text-h6">{{ levelTwoByCategoryABCN }}</span></q-banner
      >
      <q-btn
        icon="chevron_right"
        color="grey"
        label="Вперед"
        :disabled="levelTwoByCategoryID === 4"
        @click="nextLevelTwoByCategory"
      ></q-btn>
      <q-btn
        icon="check"
        color="primary"
        label="Завершить тест"
        @click="completeTest"
      ></q-btn>
    </div>
    <div v-if="partTwoQuestions" class="column q-mt-md">
      <div class="row">
        <div class="col-1 text-center">##</div>
        <div class="col-2 text-center">Target language</div>
        <div class="col-5 text-center">Question asked</div>
        <div class="col-2 text-center">Result</div>
        <div class="col-2 text-center">Extra comments</div>
      </div>
      <div v-for="q in partTwoQuestions" :key="q.id" class="row">
        <div class="col-1 q-table--bordered q-pa-md text-center">
          {{ q.category }}
        </div>
        <div class="col-2 q-table--bordered q-pa-md" v-html="q.target"></div>
        <div class="col-5 q-table--bordered">
          <ul v-if="q.question">
            <li v-for="(question, index) in q.question" :key="index">
              {{ question }}
            </li>
          </ul>
        </div>
        <div class="col-2 q-table--bordered q-pa-md">
          <q-select
            dense
            options-dense
            outlined
            emit-value
            map-options
            v-model="q.result"
            :options="q.answer"
            @input="onInput"
          />
        </div>
        <div class="col-2 q-table--bordered q-pa-md">
          <q-input v-model="q.extra" outlined autogrow @blur="onInput" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import { findMinElement } from '../../../lib/utils'
import { categories, levelTwoByCategoryValues, partTwoCategories, selfTestLevels } from './constants'

export default {
  name: 'SpeakingTest',
  mixins: [mixin],
  props: {
    levelOne: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // levelTwoByCategory: 0,
      levelTwoByCategoryID: 0,
      savedLevelTwoByCategoryID: 0,
      partTwoQuestions: null,
      tempTwoResults: [[], [], [], []],
      partTwoResult: 0
    }
  },
  async mounted () {
    await this.initResults()
    await this.initQuestions()
    // this.initPhaseData()
    this.initPartTwoQuestions()
  },
  computed: {
    levelTwoByCategoryABCN () {
      return partTwoCategories[this.levelTwoByCategoryID - 1]
    }
  },
  methods: {
    async initResults () {
      const { id } = this.user
      const { attempt } = this.attempt
      this.results = await this.loadResults({ id, attempt })

      const phaseData = this.results.find(e => e.part === 2 && e.phase === 1)
      if (phaseData && phaseData.result > 0) {
        const { answers } = phaseData
        const phaseDataArr = JSON.parse(answers)
        this.levelTwoByCategoryID = phaseData.result
        this.initTempTwoResults(this.levelTwoByCategoryID, phaseDataArr)
      } else {
        const levelTwoByCategory = this.calcLevelTwoByCategory(this.levelOne)
        this.levelTwoByCategoryID = this.calcLevelTwoByCategoryID(levelTwoByCategory)
      }

      this.savedLevelTwoByCategoryID = this.levelTwoByCategoryID
    },
    async initQuestions () {
      const { test } = this.attempt
      const part = 2
      const phase = this.levelTwoByCategoryID
      await this.loadQuestions({
        test,
        part,
        phase
      })
    },
    // initPhaseData () {
    //   const phaseData = this.results.find(e => e.part === 2 && e.phase === 1)
    //   if (phaseData) {
    //     const { answers } = phaseData
    //     const phaseDataArr = JSON.parse(answers)
    //     this.initTempTwoResults(this.levelTwoByCategoryID, phaseDataArr)
    //     return true
    //   }
    //   return false
    // },
    calcLevelTwoByLevel (levelTwo) {

    },
    calcLevelTwoByCategory (levelOne) {
      const obj = findMinElement(selfTestLevels, levelOne)
      if (obj) return obj
      return 0
    },
    calcLevelTwoByCategoryID (levelTwoByCategory) {
      return levelTwoByCategoryValues.findIndex(e => e.min <= levelTwoByCategory && levelTwoByCategory < e.max) + 1
      // if (levelTwoByCategory >= 1 && levelTwoByCategory < 9) return 1
      // if (levelTwoByCategory >= 9 && levelTwoByCategory < 15) return 2
      // if (levelTwoByCategory >= 15 && levelTwoByCategory < 21) return 3
      // return 4
    },
    async restartLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        this.levelTwoByCategoryID = this.savedLevelTwoByCategoryID

        for (let l = 1; l < 5; l++) {
          this.clearTempTwoResults(l)
        }

        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async prevLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        this.levelTwoByCategoryID--
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async nextLevelTwoByCategory () {
      if (this.levelTwoByCategoryID < 4) {
        this.levelTwoByCategoryID++
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    onInput () {
      this.tempTwoResults[this.levelTwoByCategoryID - 1] = this.partTwoQuestions
        .filter(e => e.result || e.extra)
        .map(e => {
          const { phase, part, category, result, extra } = e
          return { phase, part, category, result, extra }
        })
    },
    initPartTwoQuestions () {
      this.partTwoQuestions = this.questions
        .map(e => {
          const tempResult = this.getTempResult(e)
          return {
            ...e,
            question: e.question.split('#'),
            answer: e.answer.split('#').map((e, i) => {
              return { label: e, value: i }
            }),
            ...tempResult
          }
        }, this)
        .sort((a, b) => a.category - b.category)
    },
    getTempResult (obj) {
      const out = this.tempTwoResults[this.levelTwoByCategoryID - 1].find(
        e =>
          e.part === obj.part &&
          e.phase === obj.phase &&
          e.category === obj.category
      )
      if (out) {
        const { result, extra } = out
        return { result, extra }
      }
      return { result: null, extra: '' }
    },
    initTempTwoResults (levelID, result) {
      this.tempTwoResults[levelID - 1] = result
    },
    clearTempTwoResults (levelID) {
      this.tempTwoResults[levelID - 1] = []
    },
    calcPartTwoResults () {
      /**
       * categoryDefaultValue - default category: 2...3
       * 10 - num questions
       */
      let outLeftLevel = (this.levelTwoByCategoryID - 1) * this.partTwoCategoryDefaultValue * this.partTwoQuestionsNum
      let outLevel = this.tempTwoResults[this.levelTwoByCategoryID - 1].reduce(
        (a, e) => a + e.result,
        0
      )
      console.log((outLeftLevel + outLevel) / 10)
      return (outLeftLevel + outLevel) / 10
    },
    async completeTest () {
      this.partTwoResult = this.calcPartTwoResults()
      await this.saveResults()
      this.$emit('part-two-result-saved')
    },
    async saveResults () {
      const { id: idUser } = this.user
      const { test, attempt } = this.attempt
      const part = 2
      const phase = categories.generalCommentOnOralAssessmentBands.phase
      const level = this.partTwoResult
      const result = this.levelTwoByCategoryID
      const a = this.tempTwoResults[this.levelTwoByCategoryID - 1].map(e => {
        const { part, phase, category, result, extra } = e
        return { part, phase, category, result, extra }
      })
      const answers = JSON.stringify(a)

      await this.saveResult({
        idUser,
        attempt,
        test,
        part,
        phase,
        level,
        answers,
        result
      })
    }
  }
}
</script>

<style></style>
