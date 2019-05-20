<template>
  <q-page padding>
    <div>
      <multi-choice :question="question" @on-answer="onAnswer"></multi-choice>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MultiChoice from '../../components/la/MultiChoice'

export default {
  name: 'LaOneTest',
  components: { MultiChoice },
  data () {
    return {}
  },
  mounted () {
    this.SET_MODULE('one')

    this.SET_LEFT_DRAWER(true)
    this.SET_RIGHT_DRAWER(true)

    this.SET_TEST(1)
    this.SET_PART(1)
    this.SET_PHASE(1)

    this.RESET_CATEGORY()
    this.initQuestions()
  },
  methods: {
    onAnswer (answer) {
      if (answer) {
        const { part, phase, category } = this
        this.ADD_ANSWER({ ...answer, part, phase, category })
        this.ADD_RESULT(answer.a)
      }
      this.nextQuestion()
    },
    async initQuestions () {
      await this.load()
    },
    nextCategory () {
      if (this.category < this.max) {
        this.NEXT_CATEGORY()
        this.initQuestions()
      } else {
        this.route.push({ name: 'la-one-end' })
      }
    },
    nextQuestion () {
      if (this.current < this.total - 1) {
        this.NEXT_QUESTION()
      } else {
        this.nextCategory()
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
    ...mapActions('questions', ['load']),
    ...mapMutations('one', ['ADD_ANSWER', 'ADD_RESULT'])
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('app', ['api']),
    ...mapGetters('one', ['title', 'description', 'max']),
    ...mapGetters('questions', [
      'question',
      'questions',
      'total',
      'current',
      'test',
      'part',
      'phase',
      'category'
    ])
  }
}
</script>

<style></style>
