<template>
  <div style="width: 100%;">
    <div v-if="data">
      <q-banner class="bg-secondary text-white" rounded>
        <span class="text-h4">{{ data.question }}</span>
      </q-banner>
      <div v-if="hint" class="text-h6">
        это:
        <span class="text-grey-14 text-body2">
          (выберите один вариант ответа)
        </span>
      </div>
      <div class="q-pa-md">
        <div :class="[ { column: orientation === 'V' }, { row: orientation === 'H' } ]">
          <q-item
            v-for="a in answerOptions"
            :key="a.label"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-radio v-model="answer" :val="a.value" @input="onInput"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">{{ a.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <q-btn v-if="next" label="Далее" color="primary" class="q-ma-md" @click="onNext" />
      <div v-if="next" class="text-grey-14">
        Если Вы не помните или не знаете ответа - просто нажмите кнопку <q>Далее</q>
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
    },
    orientation: {
      type: String,
      required: false,
      default () {
        return 'V'
      }
    },
    next: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    hint: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    shuffle: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      answer: null
    }
  },
  methods: {
    getAnswer (val) {
      let out = null
      if (val) {
        const a = this.data.answer.split('#')
        const w = this.data.weigths.split('#')
        out = {
          q: this.data.question,
          a: w[val - 1],
          aa: a[val - 1]
        }
      } else {
        out = {
          q: this.data.question,
          a: 0,
          aa: ''
        }
      }
      return out
    },
    onInput (val) {
      this.$emit('input', this.getAnswer(val))
    },
    onNext () {
      this.$emit('on-answer', this.getAnswer(this.answer))
    }
  },
  computed: {
    answerOptions () {
      if (this.data && this.data.answer) {
        const out = this.data.answer
          .split('#')
          .map((e, i) => {
            return { label: e, value: i + 1 }
          })
        return this.shuffle ? out.sort(() => Math.random() - 0.5) : out
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
