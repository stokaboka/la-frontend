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
    return {}
  },
  async mounted () {
    await this.initResults()
    await this.initQuestions()
    this.initPartTwoQuestions()
    this.initTempTwoResults(this.levelTwoByCategoryID, 2)
  },
  methods: {
    async restartLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        this.levelTwoByCategoryID = this.savedLevelTwoByCategoryID

        for (let l = 1; l < 5; l++) {
          this.clearTempTwoResults(l)
        }

        await this.initQuestions()
        this.initPartTwoQuestions()
        this.initTempTwoResults(this.levelTwoByCategoryID, 2)
      }
    },
    async prevLevelTwoByCategory () {
      if (this.levelTwoByCategoryID > 1) {
        for (let levelID = this.levelTwoByCategoryID; levelID < 5; levelID++) {
          this.clearTempTwoResults(levelID)
        }

        this.levelTwoByCategoryID--
        this.clearTempTwoResults(this.levelTwoByCategoryID)
        await this.initQuestions()
        this.initPartTwoQuestions()
      }
    },
    async nextLevelTwoByCategory () {
      if (this.levelTwoByCategoryID < 4) {
        this.fillTempTwoResults(this.levelTwoByCategoryID, 2)
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
      // this.saveResults({})
    }
  }
}
</script>

<style></style>
