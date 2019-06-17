<template>
  <div>
    <div class="column q-table--bordered">
      <div v-for="(r, rIndex) in matrix" :key="`r-${rIndex}`" class="column">
        <div v-if="r.rows" class="row">
          <div
            :class="r.labelClass"
            class="col-3 q-table--bordered items-center matrix-col matrix-col__font"
          >
            {{ r.label }}
          </div>

          <div class="column col-9" :class="r.labelClass">
            <div
              v-if="r.gadget && r.gadget === 'phoneticAndPronunciationSelect'"
              class="col row items-center"
            >
              <q-select
                outlined
                v-model="phoneticAndPronunciation.model"
                :options="phoneticAndPronunciation.options"
              />
            </div>
            <div
              v-for="(row, rIndex) in r.rows"
              :key="`c-${rIndex}`"
              class="col row items-stretch"
            >
              <div
                v-for="(rowItem, rowItemIndex) in row"
                :key="`c-${rowItemIndex}`"
                :class="[r.rowsClass, rowItem.class]"
                class="column text-center vertical-middle q-table--bordered matrix-col matrix-col__font"
              >
                <span v-if="rowItem.label">{{ rowItem.label }}</span>
                <span v-if="rowItem.value">{{ rowItem.value }}</span>
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
      <div v-if="descriptions">
        <div class="row">
          <div class="col-3 q-table--bordered items-center matrix-col matrix-col__font">Система уровней</div>
          <div class="col-1 q-table--bordered items-center matrix-col matrix-col__font">Уровень</div>
          <div class="col-8 q-table--bordered items-center matrix-col matrix-col__font">Комментарий</div>
        </div>
        <div v-for="description in descriptions" :key="description.id" class="column" :class="description.labelClass">
          <div class="row">
            <div class="col-3 q-table--bordered items-center matrix-col matrix-col__font">{{description.label}}</div>
            <div class="col-1 q-table--bordered items-center matrix-col matrix-col__font">{{description.level}}</div>
            <div class="col-8 q-table--bordered items-center matrix-col matrix-col__font">{{description.description}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findMinElementIndex } from '../../lib/utils'

const categories = {
  vocabulary: {
    part: 1,
    phase: 1,
    label: 'Лексика / Vocabulary',
    labelClass: 'bg-green-2',
    rowsClass: 'col-1-11',
    target: 'vocabularyLevel'
  },
  grammar: {
    part: 1,
    phase: 2,
    label: 'Грамматика / Grammar',
    labelClass: 'bg-deep-orange-2',
    rowsClass: 'col-1-11',
    target: 'grammarLevel'
  },
  listening: {
    part: 1,
    phase: 3,
    label: 'Восприятие на слух / Listening',
    labelClass: 'bg-purple-2',
    rowsClass: 'col-1-11',
    target: 'listeningLevel'
  },
  generalCommentOnOralAssessmentBands: {
    part: 2,
    phase: 1,
    label: 'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
    labelClass: 'bg-light-blue-1',
    rowsClass: 'col-1-11'
  },
  confidenceInSpeaking: {
    part: 2,
    phase: 2,
    label: 'Уверенность и охотность при говорении / Confidence in speaking',
    labelClass: 'bg-light-blue-2',
    rowsClass: 'col-1-11'
  },
  speakingRate: {
    part: 2,
    phase: 3,
    label: 'Скорость речи / Speaking rate',
    labelClass: 'bg-light-blue-3',
    rowsClass: 'col-1-11'
  },
  usingOfCliche: {
    part: 2,
    phase: 4,
    label: 'Языковые клише и стандартные фразы / Using of cliché',
    labelClass: 'bg-light-blue-4',
    rowsClass: 'col-1-11'
  },
  interactivityOfSpeech: {
    part: 2,
    phase: 5,
    label: 'Характер интерактивности речи / Interactivity of speech',
    labelClass: 'bg-light-blue-5',
    rowsClass: 'col-1-11'
  },
  usingOfTheRussianLanguageInSpeech: {
    part: 2,
    phase: 6,
    label:
      'Использование помощи русского в речи / Using of the Russian language in speech',
    labelClass: 'bg-light-blue-6',
    rowsClass: 'col-1-11'
  },
  phoneticAndPronunciationSelect: {
    part: 2,
    phase: 7,
    label: 'Комментарий к фонетике и произношению / Phonetic and pronunciation',
    labelClass: 'bg-light-blue-7',
    rowsClass: 'col-1-11'
  }
}

/**
 * part I
 */
// const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]
const autoTestLevels = [
  1,
  8.4,
  17.1,
  26.5,
  35.1,
  44.7,
  54.1,
  63.7,
  73.1,
  83.7,
  100
]
const vocabularyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null]
const grammarLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, null]
const listeningLevels = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, null]

// Part1_values
// Part1_ID
const selfTestLevels = vocabularyLevels.map(
  (e, i) => e + grammarLevels[i] + listeningLevels[i]
)

/**
 * part II
 */
// Part2_values
const generalCommentOnOralAssessmentBands = [
  0,
  0.4,
  1.1,
  2.5,
  3.1,
  4.7,
  6.1,
  7.7,
  9.1,
  11.7,
  12.0
]
const confidenceInSpeaking = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const speakingRate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const usingOfCliche = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const interactivityOfSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const usingOfTheRussianLanguageInSpeech = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const Part2_final_values = [0, 5.4, 11.1, 17.5, 23.1, 29.7, 36.1, 42.7, 49.1, 56.7, 62]
const talkTestLevels = generalCommentOnOralAssessmentBands.map(
  (e, i) =>
    e +
    confidenceInSpeaking[i] +
    speakingRate[i] +
    usingOfCliche[i] +
    interactivityOfSpeech[i] +
    usingOfTheRussianLanguageInSpeech[i]
)

// const FinalRating_values = [1, 8.4, 17.1, 26.5, 35.1, 44.7, 54.1, 63.7, 73.1, 83.7, 100]

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
      results: null,
      descriptions: null,
      phoneticAndPronunciation: {
        options: phoneticAndPronunciation,
        model: null
      },
      levelOne: 0,
      levelTwo: 0,
      matrix: [
        {
          label:
            'Общеевропейская Система Уровней Владения Иностранными Языками (CEF)',
          labelClass: 'bg-orange-1',
          rowsClass: 'bg-orange-1',
          rows: [
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
          rows: [
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
          rowsClass: 'col-1-11',
          target: 'finalLevel',
          rows: [
            autoTestLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'ЧАСТЬ I: САМОСТОЯТЕЛЬНАЯ',
          labelClass: 'bg-purple-11',
          rows: null
        },

        {
          ...categories.vocabulary,
          rows: [
            vocabularyLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.grammar,
          rows: [
            grammarLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.listening,
          rows: [
            listeningLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Баллы для автоматического определения уровня (по самостоятельной части)',
          labelClass: 'bg-orange-1',
          rowsClass: 'col-1-11',
          target: 'levelOne',
          rows: [
            selfTestLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Сумма набранных баллов по самостоятельной части тестирования (отражается балл и соответствующий уровень):',
          labelClass: 'bg-orange-1',
          rowsClass: 'col-1-11',
          source: 'levelOne',
          rows: [[{ value: 0 }]]
        },

        {
          label: 'ЧАСТЬ II: УСТНАЯ',
          labelClass: 'bg-purple-11',
          rows: null
        },

        {
          ...categories.generalCommentOnOralAssessmentBands,
          // label:
          //   'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
          // labelClass: 'bg-light-blue-1',
          // rowsClass: 'col-1-11',
          rows: [
            generalCommentOnOralAssessmentBands.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.confidenceInSpeaking,
          // label:
          //   'Уверенность и охотность при говорении / Confidence in speaking',
          // labelClass: 'bg-light-blue-2',
          // rowsClass: 'col-1-11',
          rows: [
            confidenceInSpeaking.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.speakingRate,
          rows: [
            speakingRate.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.usingOfCliche,
          rows: [
            usingOfCliche.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.interactivityOfSpeech,
          rows: [
            interactivityOfSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.usingOfTheRussianLanguageInSpeech,
          rows: [
            usingOfTheRussianLanguageInSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.phoneticAndPronunciationSelect,
          rows: [],
          gadget: 'phoneticAndPronunciationSelect'
        },

        {
          label:
            'Баллы для автоматического определения уровня (по устной части)',
          labelClass: 'bg-orange-1',
          rowsClass: 'col-1-11',
          rows: [
            talkTestLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Сумма набранных баллов по устной части тестирования (отражается балл и соответствующий уровень):',
          labelClass: 'bg-white',
          rowsClass: 'col-1-11',
          rows: []
        }
      ]
    }
  },
  mounted () {
    this.initResults()
  },
  computed: {
    vocabularyLevel () {
      return this.getPartPhaseLevel(1, 1)
    },
    grammarLevel () {
      return this.getPartPhaseLevel(1, 2)
    },
    listeningLevel () {
      return this.getPartPhaseLevel(1, 3)
    },
    finalLevel () {
      return this.levelOne + this.levelTwo
    },
    ...mapGetters('users', ['user']),
    ...mapGetters('results', ['savedResults']),
    ...mapGetters('attempts', ['attempt'])
  },
  methods: {
    getPartPhaseLevel (part, phase) {
      const phaseObj = this.results.find(
        e => e.part === part && e.phase === phase
      )
      if (phaseObj) return phaseObj.level
      return 0
    },
    async initResults () {
      const { id } = this.user
      const { attempt } = this.attempt
      this.results = await this.loadResults({ id, attempt })

      this.levelOne = this.calcResultsPartOne()
      this.levelTwo = this.calcResultsPartTwo()

      this.descriptions = await this.loadDescription({
        test: this.attempt.test,
        results: this.results
      }).then(data =>
        data.map(e => {
          const category = Object.values(categories).find(ee => ee.part === e.part && ee.phase === e.phase)
          if (category) return { ...e, ...category }
          return e
        })
      )

      this.showLevels()
    },
    showLevels () {
      this.matrix = this.matrix.map(e => {
        if (e.target) {
          e.rows = e.rows.map(row => {
            const minIdx = findMinElementIndex(row, this[e.target], 'value')
            return row.map((item, itemIdx) => {
              return { ...item, ...{ class: itemIdx === minIdx ? 'bg-red text-white text-weight-bold shadow-2' : '' } }
            }, this)
          }, this)
        }
        if (e.source) {
          e.rows = e.rows.map(row => {
            return row.map((item) => {
              return { ...item, value: this[e.source] }
            }, this)
          }, this)
        }
        return { ...e }
      })
    },
    calcResultsPartOne () {
      const level = this.results
        .filter(e => e.part === 1)
        .reduce((acc, e) => acc + e.level, 0)
      return level
    },
    calcResultsPartTwo () {
      const level = this.results
        .filter(e => e.part === 2)
        .reduce((acc, e) => acc + e.level, 0)
      return level
    },

    ...mapActions('results', { loadResults: 'load' }),
    ...mapActions('description', { loadDescription: 'load' })
  }
}
</script>

<style scoped>
.matrix-row {
}

.matrix-col {
  flex: 1 0 auto;
  overflow: hidden;
  padding: 0.25rem;
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
</style>
