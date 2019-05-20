<template>
  <div>
    <div v-if="question">
      <h4 v-html="question.question"></h4>
      <div class="q-pa-md">
        <q-option-group
          :options="answerOptions"
          label="Notifications"
          type="radio"
          v-model="answer"
        />
      </div>
      <q-btn
        label="Продолжить"
        color="primary"
        class="q-ma-md"
        @click="onNext"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiChoice',
  props: {
    question: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      answer: null
    }
  },
  methods: {
    onNext () {
      if (this.answer) {
        const w = this.question.weigths.split('#')
        const data = {
          q: this.question.question,
          a: w[this.answer - 1]
        }
        this.$emit('on-answer', data)
      } else {
        this.$emit('on-answer', null)
      }
    }
  },
  computed: {
    answerOptions () {
      if (this.question) {
        const q = this.question.answer.split('#')
        const out = q
          .map((e, i) => {
            return { label: e, value: i + 1 }
          })
          .sort(() => Math.random() - 0.5)
        return out
      } else {
        return []
      }
    }
  },
  watch: {
    question (val) {
      this.answer = null
    }
  }
}
</script>

<style>
  .q-radio__label {
    font-size: 1.2rem;
  }
</style>
