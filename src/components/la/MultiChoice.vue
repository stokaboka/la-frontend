<template>
  <div style="width: 100%;">
    <div v-if="data">
      <q-banner class="bg-secondary text-white" rounded>
        <span class="text-h4">{{ data.question }}</span>
      </q-banner>
      <div class="text-h6">
        это:
        <span class="text-grey-14 text-body1">
          (выберите один вариант ответа)
        </span>
      </div>
      <div class="q-pa-md">
        <q-list>
          <q-item
            v-for="a in answerOptions"
            :key="a.label"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio v-model="answer" :val="a.value" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">{{ a.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-btn label="Далее" color="primary" class="q-ma-md" @click="onNext" />
      <div class="text-grey-14">
        Если Вы не помните или не знаете ответа - просто нажмите кнопку
        <q>Далее</q>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiChoice',
  props: {
    data: {
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
        const w = this.data.weigths.split('#')
        const out = {
          q: this.data.question,
          a: w[this.answer - 1]
        }
        this.$emit('on-answer', out)
      } else {
        this.$emit('on-answer', null)
      }
    }
  },
  computed: {
    answerOptions () {
      if (this.data) {
        const q = this.data.answer.split('#')
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
    data (val) {
      this.answer = null
    }
  }
}
</script>

<style></style>
