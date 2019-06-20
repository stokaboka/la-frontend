<template>
  <div>
    <div class="row q-gutter-md">
      <q-btn icon="first_page" color="secondary" label="Начать сначала" @click="restartLevelTwoByCategory"></q-btn>
      <q-btn
        icon="chevron_left"
        color="grey"
        label="Назад"
        :disabled="levelOneByCategoryID === 1"
        @click="prevLevelTwoByCategory"
      ></q-btn>
      <q-banner rounded class="bg-orange text-white"
        ><span class="text-h6">{{ levelOneByCategoryABCN }}</span></q-banner
      >
      <q-btn
        icon="chevron_right"
        color="grey"
        label="Вперед"
        :disabled="levelOneByCategoryID === 4"
        @click="nextLevelTwoByCategory"
      ></q-btn>
      <q-btn icon="check" color="primary" label="Завершить тест"></q-btn>
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
export default {
  name: 'SpeakingTest',
  mixins: [mixin],
  data () {
    return {
      partTwoQuestions: null,
      tempResults: [[], [], [], []]
    }
  },
  async mounted () {
    await this.initResults()
    await this.initQuestions()
    this.initPartTwoQuestions()
  },
  methods: {
    async restartLevelTwoByCategory () {
      if (this.levelOneByCategoryID > 1) {
        this.levelOneByCategoryID = this.savedLevelTwoByCategoryID
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async prevLevelTwoByCategory () {
      if (this.levelOneByCategoryID > 1) {
        for (let levelID = this.levelOneByCategoryID; levelID < 5; levelID++) {
          this.clearTempResults(levelID)
        }

        this.levelOneByCategoryID--
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async nextLevelTwoByCategory () {
      if (this.levelOneByCategoryID < 4) {
        this.fillTempResults(this.levelOneByCategoryID, 2)
        this.levelOneByCategoryID++
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    initPartTwoQuestions () {
      this.partTwoQuestions = this.questions
        .map(e => {
          const resultExtra = this.getTempResult(e)
          return {
            ...e,
            question: e.question.split('#'),
            answer: e.answer.split('#').map((e, i) => {
              return { label: e, value: i }
            }),
            ...resultExtra
            // result: null,
            // extra: ''
          }
        }, this)
        .sort((a, b) => a.category - b.category)
    },
    getTempResult (obj) {
      const out = this.tempResults[this.levelOneByCategoryID - 1]
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
    fillTempResults (levelID, result) {
      const extra = ''
      this.tempResults[levelID - 1] = this.partTwoQuestions
        .map(e => {
          const { phase, part, category } = e
          return { phase, part, category, result, extra }
        })
    },
    clearTempResults (levelID) {
      this.tempResults[levelID - 1] = []
    },
    onInput () {
      this.tempResults[this.levelOneByCategoryID - 1] = this.partTwoQuestions
        .filter(e => e.result || e.extra)
        .map(e => {
          const { phase, part, category, result, extra } = e
          return { phase, part, category, result, extra }
        })
      // this.saveResults({})
    }
  }
}
</script>

<style></style>
