<template>
  <div>
    <div class="column q-table--bordered">
      <div
        v-for="(r, rIndex) in matrix"
        :key="`r-${rIndex}`"
        class="column"
      >
        <div v-if="r.content" class="row">
          <div
            :class="r.labelClass"
            class="col-3 q-table--bordered items-center matrix-col matrix-col__font"
          >
            {{ r.label }}
          </div>

          <div class="column col-9" :class="r.labelClass">
            <div v-if="r.gadget && r.gadget === 'phoneticAndPronunciationSelect'" class="col row items-center">
              <q-select outlined v-model="phoneticAndPronunciation.model" :options="phoneticAndPronunciation.options" />
            </div>
            <div
              v-for="(rContent, cIndex) in r.content"
              :key="`c-${cIndex}`"
              class="col row items-stretch"
            >

              <div
                v-for="(cContent, ccIndex) in rContent"
                :key="`c-${ccIndex}`"
                :class="[cContent.class, r.contentClass]"

                class="column text-center vertical-middle q-table--bordered matrix-col matrix-col__font"
              >
                <span v-if="cContent.label">{{ cContent.label }}</span>
                <span v-if="cContent.value">{{ cContent.value }}</span>
              </div>

            </div>
          </div>
        </div>

        <div v-else class="row">
          <div
            :class="r.labelClass"
            class="col q-table--bordered text-center matrix-col matrix-col__font"
          >
            {{ r.label }}
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
/**
   * part I
   */
// const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]
const autoTestLevels = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]
const vocabularyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null]
const grammarLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, null]
const listeningLevels = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, null]

// Part1_values
// Part1_ID
const selfTestLevels = vocabularyLevels.map((e, i) => e + grammarLevels[i] + listeningLevels[i])

/**
   * part II
   */
// Part2_values
const generalCommentOnOralAssessmentBands = [ 0, 0.4, 1.1, 2.5, 3.1, 4.7, 6.1, 7.7, 9.1, 11.7, 12.0 ]
const confidenceInSpeaking = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const speakingRate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const usingOfCliche = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const interactivityOfSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const usingOfTheRussianLanguageInSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const Part2_final_values = [0, 5.4, 11.1, 17.5, 23.1, 29.7, 36.1, 42.7, 49.1, 56.7, 62]
const talkTestLevels = generalCommentOnOralAssessmentBands.map((e, i) =>
  e +
  confidenceInSpeaking[i] +
  speakingRate[i] +
  usingOfCliche[i] +
  interactivityOfSpeech[i] +
  usingOfTheRussianLanguageInSpeech[i]
)

const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]

const phoneticAndPronunciation = [
  { value: 1, label: 'необходима работа над звуками' },
  { value: 2, label: 'необходима работа над интонацией' },
  { value: 3, label: 'необходима работа над фонетикой' },
  { value: 4, label: 'рекомендована работа над фонетикой' }
]

export default {
  name: 'UserResultMatrix',
  data () {
    return {
      phoneticAndPronunciation: {
        options: phoneticAndPronunciation,
        model: null
      },
      matrix: [
        {
          label:
            'Общеевропейская Система Уровней Владения Иностранными Языками (CEF)',
          labelClass: 'bg-orange-1',
          contentClass: 'bg-orange-1',
          content: [
            [
              { label: 'A1', class: 'col-3-11' },
              { label: 'A2', class: 'col-2-11' },
              { label: 'B1', class: 'col-2-11' },
              { label: 'B2', class: 'col-2-11' },
              { label: 'C1', class: 'col-1-11' },
              { label: 'C2', class: 'col-1-11' }
            ]
          ]
        },

        {
          label: 'Система Уровней Владения Иностранными Языками Свободы Слова',
          labelClass: 'bg-white',
          content: [
            [
              { label: 'Beginner', class: 'col-2-11 bg-yellow' },
              { label: 'Elementary', class: 'col-2-11 bg-orange-11' },
              {
                label: 'Pre-Intermediate',
                class: 'col-2-11 bg-light-green-13'
              },
              { label: 'Intermediate', class: 'col-2-11 bg-cyan-2' },
              { label: 'Upper-Intermediate', class: 'col-2-11 bg-indigo-11' },
              { label: 'Advanced', class: 'col-1-11 bg-blue' }
            ],
            [
              { label: 'Absolute', class: 'col-1-11 bg-yellow' },
              { label: 'False', class: 'col-1-11 bg-yellow' },
              { label: 'Entry', class: 'col-1-11 bg-orange-11' },
              { label: 'Confident', class: 'col-1-11 bg-orange-11' },
              { label: 'Entry', class: 'col-1-11 bg-light-green-13' },
              { label: 'Confident', class: 'col-1-11 bg-light-green-13' },
              { label: 'Entry', class: 'col-1-11 bg-cyan-2' },
              { label: 'Confident', class: 'col-1-11 bg-cyan-2' },
              { label: 'Entry', class: 'col-1-11 bg-indigo-11' },
              { label: 'Confident', class: 'col-1-11 bg-indigo-11' },
              { label: 'Competent', class: 'col-1-11 bg-blue' }
            ]
          ]
        },

        {
          label: 'Баллы для автоматического подсчета итогов тестирования',
          labelClass: 'bg-orange-1',
          contentClass: 'col-1-11 bg-orange-1',
          content: [ autoTestLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'ЧАСТЬ I: САМОСТОЯТЕЛЬНАЯ',
          labelClass: 'bg-purple-11',
          content: null
        },

        {
          label: 'Лексика / Vocabulary',
          labelClass: 'bg-green-2',
          contentClass: 'col-1-11 bg-green-2',
          content: [ vocabularyLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'Грамматика / Grammar',
          labelClass: 'bg-deep-orange-2',
          contentClass: 'col-1-11 bg-deep-orange-2',
          content: [ grammarLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'Восприятие на слух / Listening',
          labelClass: 'bg-purple-2',
          contentClass: 'col-1-11 bg-purple-2',
          content: [ listeningLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'Баллы для автоматического определения уровня (по самостоятельной части)',
          labelClass: 'bg-orange-1',
          contentClass: 'col-1-11 bg-orange-1',
          content: [ selfTestLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'Сумма набранных баллов по самостоятельной части тестирования (отражается балл и соответствующий уровень):',
          labelClass: 'bg-orange-1',
          contentClass: 'col-1-11 bg-orange-1',
          content: []
        },

        {
          label: 'ЧАСТЬ II: УСТНАЯ',
          labelClass: 'bg-purple-11',
          content: null
        },

        {
          label: 'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ generalCommentOnOralAssessmentBands.map(e => { return { value: e } }) ]
        },

        {
          label: 'Уверенность и охотность при говорении / Confidence in speaking',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ confidenceInSpeaking.map(e => { return { value: e } }) ]
        },

        {
          label: 'Скорость речи / Speaking rate',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ speakingRate.map(e => { return { value: e } }) ]
        },

        {
          label: 'Языковые клише и стандартные фразы / Using of cliché',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ usingOfCliche.map(e => { return { value: e } }) ]
        },

        {
          label: 'Характер интерактивности речи / Interactivity of speech',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ interactivityOfSpeech.map(e => { return { value: e } }) ]
        },

        {
          label: 'Использование помощи русского в речи / Using of the Russian language in speech',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ usingOfTheRussianLanguageInSpeech.map(e => { return { value: e } }) ]
        },

        {
          label: 'Комментарий к фонетике и произношению / Phonetic and pronunciation',
          labelClass: 'bg-light-blue-1',
          contentClass: 'col-1-11 bg-light-blue-1',
          content: [ ],
          gadget: 'phoneticAndPronunciationSelect'
        },

        {
          label: 'Баллы для автоматического определения уровня (по устной части)',
          labelClass: 'bg-orange-1',
          contentClass: 'col-1-11 bg-orange-1',
          content: [ talkTestLevels.map(e => { return { value: e } }) ]
        },

        {
          label: 'Сумма набранных баллов по устной части тестирования (отражается балл и соответствующий уровень):',
          labelClass: 'bg-white',
          contentClass: 'col-1-11 bg-white',
          content: [ ]
        }
      ]
    }
  },
  mounted () {
    this.load()
  },
  computed: {
    ...mapGetters('results', ['savedResults'])
  },
  methods: {
    reindex () {
      let _r = 0
      let _c = 0
      this.matrix = this.matrix.map(r => {
        ++_r
        r.content = r.content.map(c => {
          return { ...c, id: `${_r}-${++_c}` }
        })
        return r
      })
    },
    ...mapActions('results', { loadResults: 'load' })
  }
}
</script>

<style scoped>
.matrix-row {
}

.matrix-col {
  flex: 1 0 fit-content;
  overflow: hidden;
}

.matrix-col__font {
  font-size: 0.8rem;
}

.col-1-11 {
  width: calc(100% * 1 / 11);
}

.col-2-11 {
  width: calc(100% * 2 / 11);
}

.col-3-11 {
  width: calc(100% * 3 / 11);
}

/* CSS Document */

.title_text {
  color: #ff0000;
}

.rating-table {
  border: 1px solid #666;
}

.ratingTable_td {
  border: 1px solid #666;
  text-align: center;
}

.rating_table_header,
.rating_table_footer {
  background: #cccc99;
}

.Beginner {
  background: #ffff00;
}

.Elementary {
  background: #ffcc00;
}

.Pre-Intermediate {
  background: #00ff00;
}

.Intermediate {
  background: #00ffcc;
}

.Upper-Intermediate {
  background: #6699ff;
}

.Advanced {
  background: #3366cc;
}

.part_header {
  background: #cc33cc;
}

.Vocabulary {
  background: #cccc66;
}

.Grammar {
  background: #ff9966;
}

.Listening {
  background: #cc9999;
}

.part_two_body {
  background: #ccddff;
}

.General_comment_on_oral_Assessment_Bands {
  background: #bbffff;
}

.Confidence_in_speaking {
  background: #aaffff;
}

.Speaking_rate {
  background: #aaeeff;
}

.Using_of_cliche {
  background: #88eeff;
}

.Interactivity_of_speech {
  background: #77ddff;
}

.Using_of_the_Russian_language_in_speech {
  background: #66ccff;
}

.Phonetic_and_pronunciation {
  background: #9cf;
}

.ratingSelectedCell {
  background: #ff0000;
  border: 2px solid #ff0;
}
</style>
