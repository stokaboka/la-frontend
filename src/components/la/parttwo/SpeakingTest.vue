<template>
  <div>
    <div class="row q-gutter-md">
      <q-btn icon="first_page" color="secondary" label="Начать сначала"></q-btn>
      <q-btn icon="chevron_left" color="grey" label="Назад" :disabled="levelOneByCategoryID === 1"></q-btn>
      <q-banner inline-actions rounded class="bg-orange text-white">{{levelOneByCategoryID}}</q-banner>
      <q-btn icon="chevron_right" color="grey" label="Вперед" :disabled="levelOneByCategoryID === 4"></q-btn>
      <q-btn icon="check" color="primary" label="Завершить тест"></q-btn>
    </div>
    <div v-if="partTwoQuestions" class="column">
      <div v-for="q in partTwoQuestions" :key="q.id" class="row">
        <div>{{q.category}}</div>
        <div v-html="q.target"></div>
        <div>
          <ul v-if="q.question">
            <li v-for="(question, index) in q.question" :key="index">{{question}}</li>
          </ul>
        </div>
        <div>
          <multi-choice
            class="q-mt-md"
            :data="q"
            orientation="H"
            :next="false"
            :hint="false"
            :shuffle="false"
            @input="onInput"
          ></multi-choice>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import MultiChoice from '../MultiChoice'
export default {
  name: 'SpeakingTest',
  components: { MultiChoice },
  mixins: [mixin],
  data () {
    return {
      partTwoQuestions: null
    }
  },
  mounted () {
    this.initResults()
    this.initQuestions()
    this.partTwoQuestions = this.questions.map(e => {
      return {
        ...e,
        question: e.question.split('#'),
        answer: e.answer.split('#')
      }
    })
  },
  methods: {
    onInput (val) {
      console.dir(val)
    }
  }
}
</script>

<style>
</style>
