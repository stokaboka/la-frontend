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
        <div
          v-for="description in descriptions"
          :key="description.id"
          class="column"
        >
          <div class="column">
            <div
              :class="description.labelClass"
              class="col q-table--bordered items-center matrix-col matrix-col__font"
            >
              {{ description.label }}
            </div>
            <div class="row no-wrap">
              <div class="col-1 q-table--bordered items-center matrix-col matrix-col__font">
                {{ description.level }}
              </div>
              <div class="col-11 q-table--bordered items-center matrix-col matrix-col__font">
                {{ description.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import {
  categories,
  autoTestLevels,
  vocabularyLevels,
  grammarLevels,
  listeningLevels,
  selfTestLevels,
  generalCommentOnOralAssessmentBands,
  confidenceInSpeaking,
  speakingRate,
  usingOfCliche,
  interactivityOfSpeech,
  usingOfTheRussianLanguageInSpeech,
  talkTestLevels,
  phoneticAndPronunciation
} from './constants'

export default {
  name: 'UserResultMatrix',
  mixins: [mixin],
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
  async mounted () {
    await this.initResults()
    await this.initDescriptions()
    this.showLevels()
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
    }
  }
}
</script>

<style scoped>
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
