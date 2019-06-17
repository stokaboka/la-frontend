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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findMinElementIndex } from '../../lib/utils'
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
          label: 'Лексика / Vocabulary',
          labelClass: 'bg-green-2',
          rowsClass: 'col-1-11',
          target: 'vocabularyLevel',
          rows: [
            vocabularyLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'Грамматика / Grammar',
          labelClass: 'bg-deep-orange-2',
          rowsClass: 'col-1-11',
          target: 'grammarLevel',
          rows: [
            grammarLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'Восприятие на слух / Listening',
          labelClass: 'bg-purple-2',
          rowsClass: 'col-1-11',
          target: 'listeningLevel',
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
          rows: []
        },

        {
          label: 'ЧАСТЬ II: УСТНАЯ',
          labelClass: 'bg-purple-11',
          rows: null
        },

        {
          label:
            'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
          labelClass: 'bg-light-blue-1',
          rowsClass: 'col-1-11',
          rows: [
            generalCommentOnOralAssessmentBands.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Уверенность и охотность при говорении / Confidence in speaking',
          labelClass: 'bg-light-blue-2',
          rowsClass: 'col-1-11',
          rows: [
            confidenceInSpeaking.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'Скорость речи / Speaking rate',
          labelClass: 'bg-light-blue-3',
          rowsClass: 'col-1-11',
          rows: [
            speakingRate.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'Языковые клише и стандартные фразы / Using of cliché',
          labelClass: 'bg-light-blue-4',
          rowsClass: 'col-1-11',
          rows: [
            usingOfCliche.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label: 'Характер интерактивности речи / Interactivity of speech',
          labelClass: 'bg-light-blue-5',
          rowsClass: 'col-1-11',
          rows: [
            interactivityOfSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Использование помощи русского в речи / Using of the Russian language in speech',
          labelClass: 'bg-light-blue-6',
          rowsClass: 'col-1-11',
          rows: [
            usingOfTheRussianLanguageInSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          label:
            'Комментарий к фонетике и произношению / Phonetic and pronunciation',
          labelClass: 'bg-light-blue-7',
          rowsClass: 'col-1-11',
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
  async mounted () {
    const { id } = this.user
    const { attempt } = this.attempt
    await this.loadResults({ id, attempt })
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
      const phaseObj = this.savedResults.find(
        e => e.part === part && e.phase === phase
      )
      if (phaseObj) return phaseObj.level
      return 0
    },
    initResults () {
      this.levelOne = this.calcResultsPartOne()
      this.levelTwo = this.calcResultsPartTwo()
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
        // const midx = findMinElementIndex(e.rows, this[e.target], 'value')
        // e.rows = e.rows.map((ee, ii) => {
        //   return ee.map((eee, iii) => {
        //     return { ...eee, ...{ class: iii === midx ? 'bg-red text-white text-weight-bold shadow-2' : '' } }
        //   })
        // })
        return { ...e }
      })
    },
    calcResultsPartOne () {
      const levelOne = this.savedResults
        .filter(e => e.part === 1)
        .reduce((acc, e) => acc + e.level, 0)
      return levelOne
    },
    calcResultsPartTwo () {},

    ...mapActions('results', { loadResults: 'load' })
  }
}
</script>

<style scoped>
.matrix-row {
}

.matrix-col {
  flex: 1 0 auto;
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

.a-reached-level {
  background-color: red;
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
