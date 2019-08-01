<template>
  <div style="width: 100%;">
    <div v-if="data">
      <q-card>
        <q-card-section class="q-py-sm bg-secondary text-white">
          <div class="text-h5">{{ data.question }}</div>
          <span v-if="partOneDebug">{{trueAnswer}}</span>
        </q-card-section>

        <q-separator/>

        <q-card-section v-if="hint" class="q-py-none">
          <div  class="text-h6 text-grey-14">
            {{multiChoice.message[0]}}
            <span class="text-body2">
              {{multiChoice.message[1]}}
            </span>
          </div>
        </q-card-section>

        <q-card-actions class="q-px-none q-py-sm q-pl-md">
          <div
            :class="[
              { column: orientation === 'V' },
              { row: orientation === 'H' }
            ]"
          >
            <q-item
              v-for="a in answerOptions"
              :key="a.label"
              tag="label"
              v-ripple
              class="q-py-none q-px-md"
            >
              <q-item-section avatar class="q-pr-none">
                <q-radio v-model="answer" :val="a.value" @input="onInput" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-body1">{{ a.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-actions>
      </q-card>

      <q-btn
        v-if="next"
        :label="laonecontainer.buttons.next.label"
        color="primary"
        class="q-mt-md"
        @click="onNext"
      />

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      if (val !== null) {
        const a = this.data.answer.split('#')
        const w = this.data.weigths.split('#')
        out = {
          q: this.data.question,
          a: w[val],
          aa: a[val]
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
    trueAnswer () {
      if (this.data && this.data.weigths && this.data.answer) {
        const wIdx = this.data.weigths.split('#').findIndex(e => e > 0)
        return wIdx >= 0 ? this.data.answer.split('#')[wIdx] : '??'
      } else {
        return '?'
      }
    },
    answerOptions () {
      if (this.data && this.data.answer) {
        const out = this.data.answer.split('#').map((e, i) => {
          return { label: e, value: i }
        })
        return this.shuffle ? out.sort(() => Math.random() - 0.5) : out
      } else {
        return []
      }
    },
    ...mapGetters('config', { partOneDebug: 'partOneDebug' }),
    ...mapGetters('text', ['laonecontainer', 'multiChoice'])
  },
  watch: {
    data (val) {
      this.answer = null
    }
  }
}
</script>

<style></style>
