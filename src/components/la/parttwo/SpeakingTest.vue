<template>
  <div>
    <div class="row q-gutter-md">
      <q-btn icon="first_page" color="secondary" label="Начать сначала"></q-btn>
      <q-btn icon="chevron_left" color="grey" label="Назад" :disabled="levelOneByCategoryID === 1"></q-btn>
      <q-banner rounded class="bg-orange text-white"><span class="text-h6">{{levelOneByCategoryABCN}}</span></q-banner>
      <q-btn icon="chevron_right" color="grey" label="Вперед" :disabled="levelOneByCategoryID === 4"></q-btn>
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
        <div class="col-1 q-table--bordered q-pa-md text-center">{{q.category}}</div>
        <div class="col-2 q-table--bordered q-pa-md" v-html="q.target"></div>
        <div class="col-5 q-table--bordered">
          <ul v-if="q.question">
            <li v-for="(question, index) in q.question" :key="index">{{question}}</li>
          </ul>
        </div>
        <div class="col-2 q-table--bordered q-pa-md">
          <q-select
            dense
            options-dense
            outlined
            emit-value
            map-options
            v-model="q.model"
            :options="q.answer"
            @input="onInput"
          />
        </div>
        <div class="col-2 q-table--bordered q-pa-md">
          <q-input
            v-model="q.extra"
            outlined
            autogrow
            @input="onInput"
          />
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
      partTwoQuestions: null
    }
  },
  async mounted () {
    await this.initResults()
    await this.initQuestions()
    this.partTwoQuestions = this.questions
      .map(e => {
        return {
          ...e,
          question: e.question.split('#'),
          answer: e.answer
            .split('#')
            .map((e, i) => {
              return { label: e, value: i }
            }),
          model: null,
          extra: ''
        }
      })
      .sort((a, b) => a.category - b.category)
  },
  methods: {
    onInput () {
      this.saveResults({

      })
    }
  }
}
</script>

<style>
</style>
