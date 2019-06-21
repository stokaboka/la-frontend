<template>
  <div>
    <div class="row q-gutter-md">
      <q-btn icon="first_page" color="secondary" label="Начать сначала" @click="restartLevelTwoByCategory"></q-btn>
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
      <q-btn icon="check" color="primary" label="Завершить тест" @click="completeTest"></q-btn>
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
import { categories, selfTestLevels, partTwoCategories } from './constants'
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
      levelTwoByCategory: 0,
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
    this.initPartTwoQuestions()
    // this.initTempTwoResults(this.levelTwoByCategoryID, 2)
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

      this.levelTwoByCategory = this.calcLevelTwoByCategory(this.levelOne)
      this.levelTwoByCategoryID = this.calcLevelTwoByCategoryID(this.levelTwoByCategory)
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
    calcLevelTwoByCategory (levelOne) {
      const obj = findMinElement(selfTestLevels, levelOne)
      if (obj) return obj
      return 0
    },
    calcLevelTwoByCategoryID (levelTwoByCategory) {
      if (levelTwoByCategory >= 1 && levelTwoByCategory < 9) return 1
      if (levelTwoByCategory >= 9 && levelTwoByCategory < 15) return 2
      if (levelTwoByCategory >= 15 && levelTwoByCategory < 21) return 3
      return 4
    },
    async restartLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        this.levelTwoByCategoryID = this.savedLevelTwoByCategoryID

        for (let l = 1; l < 5; l++) {
          this.clearTempTwoResults(l)
        }

        await this.initQuestions()
        this.initPartTwoQuestions()
        // this.initTempTwoResults(this.levelTwoByCategoryID, 2)
      }
    },
    async prevLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        // for (let levelID = this.levelTwoByCategoryID; levelID < 5; levelID++) {
        //   this.clearTempTwoResults(levelID)
        // }

        this.levelTwoByCategoryID--
        // this.clearTempTwoResults(this.levelTwoByCategoryID)
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async nextLevelTwoByCategory () {
      if (this.levelTwoByCategoryID < 4) {
        // this.fillTempTwoResults(this.levelTwoByCategoryID, 2)
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
      const out = this.tempTwoResults[this.levelTwoByCategoryID - 1]
        .find(e =>
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
    // initTempTwoResults (levelID, result) {
    //   for (let l = 1; l < levelID; l++) {
    //     this.fillTempTwoResults(l, result)
    //   }
    // },
    fillTempTwoResults (levelID, result) {
      // const extra = ''
      // const part = 2
      // const phase = levelID
      // this.tempTwoResults[levelID - 1] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      //   .map(category => {
      //     return { phase, part, category, result, extra }
      //   })
      // this.tempTwoResults[levelID - 1] = this.partTwoQuestions
      //   .map(e => {
      //     const { phase, part, category } = e
      //     return { phase, part, category, result, extra }
      //   })
    },
    clearTempTwoResults (levelID) {
      this.tempTwoResults[levelID - 1] = []
      // this.tempTwoResults = []
    },
    calcPartTwoResults () {
      /**
       * 2 - default category
       * 10 - num questions
       */
      this.partTwoResult = (this.levelTwoByCategoryID - 1) * 2 * 10 +
        this.tempTwoResults[this.levelTwoByCategoryID - 1]
          .reduce((a, e) => a + e.result, 0)
      this.partTwoResult /= 10
    },
    completeTest () {
      this.calcPartTwoResults()
      this.saveResults()
      this.$emit('part-two-result-saved')
    },
    async saveResults () {
      const { id } = this.user
      const { test, attempt } = this.attempt
      const part = 2
      const phase = categories.generalCommentOnOralAssessmentBands.phase
      const level = this.partTwoResult
      const a = this.tempTwoResults[this.levelTwoByCategoryID - 1].map(e => e.result)
      const answers = JSON.stringify(a)
      const e = this.tempTwoResults[this.levelTwoByCategoryID - 1].map(e => e.extra)
      const extra = JSON.stringify(e)

      await this.save({
        id,
        attempt,
        test,
        part,
        phase,
        level,
        answers,
        extra
      })
    }
    // calcPartTwoRating () {
    //   return this.confidenceInSpeaking +
    //     this.speakingRate +
    //     this.usingOfCliche +
    //     this.interactivityOfSpeech +
    //     this.usingOfTheRussianLanguageInSpeech
    // }
  }
}
</script>

<style></style>
