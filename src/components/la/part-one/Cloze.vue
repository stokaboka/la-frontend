<template>
  <div>
    <div class="text-grey-14">
      {{cloze.message}}
    </div>
    <q-card v-if="ready">
      <q-card-section>
        <span v-for="(str, index) in questionStrings" :key="index">
          <q-select
            v-if="str.type === 'array'"
            class="multichoice"
            dense
            options-dense
            filled
            square
            v-model="str.model"
            :options="str.data"
          />
          <span v-else v-html="str.data"></span>
        </span>
      </q-card-section>
    </q-card>

    <q-btn :label="laonecontainer.buttons.next.label" color="primary" class="q-mt-md" @click="onNext" />

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

const clozeRegExp = /({.*?})/gim
const multichoiseRegExp = /{1:MULTICHOICE:(.*?)}/gim

export default {
  name: 'Cloze',
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      questionStrings: []
    }
  },
  computed: {
    ready () {
      return this.questionStrings.length > 0
    },
    ...mapGetters('config', { partOneDebug: 'partOneDebug' }),
    ...mapGetters('text', ['laonecontainer', 'cloze'])
  },
  methods: {
    parseQuestion () {
      if (this.data && this.data.question) {
        const text = this.data.question.split(clozeRegExp)
        const qst = text.map(e => {
          if (e.startsWith('{')) {
            const a = e.split(multichoiseRegExp)
            if (a && a.length === 3) {
              let ans = a[1].split('~').find(x => x.startsWith('='))
              ans = ans ? ans.replace('=', '') : ''
              return {
                data: a[1].replace('=', '').split('~'),
                type: 'array',
                // model: '\u200C',
                model: this.partOneDebug ? ans : '\u200C',
                answer: ans
              }
            }
            return { data: [], type: 'array' }
          }
          return {
            type: 'string',
            data: e.replace(/(?:\r\n|\r|\n\n|\n)/g, '<br>')
          }
        }, this)
        return qst
      }
    },
    onNext () {
      const questions = this.questionStrings
        .filter(e => e.type === 'array')
        .length

      const answers = this.questionStrings
        .filter(e => e.type === 'array')
        .filter(e => e.model === e.answer)
        .length

      const out = {
        q: questions,
        a: answers
      }
      this.$emit('on-answer', out)
    }
  },
  watch: {
    data (val) {
      this.questionStrings = this.parseQuestion()
      this.answers = []
    }
  }
}
</script>

<style scoped>
.multichoice {
  display: inline-block;
  margin-top: 3px;
}
</style>
