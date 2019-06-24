<template>
  <div>
    <div class="column q-table--bordered">
      <div class="row">
        <q-btn label="xlsx" @click="loadResultAsFile('xlsx')"></q-btn>
      </div>
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
              v-if="r.gadget"
              class="col row items-center"
            >
              <q-select
                v-if="r.gadget.type === 'select'"
                outlined
                v-model="r.gadget.model"
                :options="r.gadget.options"
                @input="onGadgetInput(r)"
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
                @click="onInteractiveCellClick(r, rowItem)"
                @touchend="onInteractiveCellClick(r, rowItem)"
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
import { findMinElementIndex, findMinElement } from '../../../lib/utils'

export default {
  name: 'UserResultMatrix',
  mixins: [mixin],
  data () {
    return {
      phoneticAndPronunciation: {
        options: phoneticAndPronunciation,
        model: null
      },
      descriptions: null,
      levelOne: 0,
      isInteractiveChangeCellData: false,
      objForSave: {},
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
          target: 'partTwoResultAnswers',
          rows: [
            generalCommentOnOralAssessmentBands.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.confidenceInSpeaking,
          target: 'confidenceInSpeaking',
          mouseClick: 'confidenceInSpeaking',
          rows: [
            confidenceInSpeaking.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.speakingRate,
          target: 'speakingRate',
          mouseClick: 'speakingRate',
          rows: [
            speakingRate.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.usingOfCliche,
          target: 'usingOfCliche',
          mouseClick: 'usingOfCliche',
          rows: [
            usingOfCliche.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.interactivityOfSpeech,
          target: 'interactivityOfSpeech',
          mouseClick: 'interactivityOfSpeech',
          rows: [
            interactivityOfSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.usingOfTheRussianLanguageInSpeech,
          target: 'usingOfTheRussianLanguageInSpeech',
          mouseClick: 'usingOfTheRussianLanguageInSpeech',
          rows: [
            usingOfTheRussianLanguageInSpeech.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.phoneticAndPronunciationSelect,
          gadgetInput: 'phoneticAndPronunciationSelect',
          rows: [],
          gadget: {
            type: 'select',
            options: phoneticAndPronunciation,
            model: null
          }
        },

        {
          ...categories.partTwoResult,
          target: 'partTwoResult',
          rows: [
            talkTestLevels.map(e => {
              return { value: e }
            })
          ]
        },

        {
          ...categories.partTwoResultClear,
          source: 'partTwoResultClear',
          rows: [[{ value: 0 }]]
        }
      ]
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.asyncRefresh()
    },
    async asyncRefresh () {
      await this.initResults()
      await this.initDescriptions()
      this.calcPartTwoFinalResult()
      this.showLevels()
    },
    async initResults () {
      const { id } = this.user
      const { attempt } = this.attempt
      this.results = await this.loadResults({ id, attempt })

      this.levelOne = this.calcResultsPart(1)

      this.$emit('set-level-one', this.levelOne)
    },
    async initDescriptions () {
      this.descriptions = await this.loadDescription({
        test: this.attempt.test,
        results: this.results.filter(e => e.phase < 7)
      }).then(data =>
        data.map(e => {
          const category = Object.values(categories).find(
            ee => ee.part === e.part && ee.phase === e.phase
          )
          if (category) return { ...e, ...category }
          return e
        })
      )
    },
    showLevels () {
      this.objForSave = { descriptions: this.descriptions.map(e => {
        const { category, description, label, level, target } = e
        return { category, description, label, level, target }
      }) }
      this.matrix = this.matrix.map(e => {
        if (e.gadget) {
          const val = this[e.gadgetInput]
          e.gadget.model = e.gadget.options.find(ee => ee.value === val)
          if (e.gadget.model) {
            this.objForSave[`${e.gadgetInput}_value`] = e.gadget.model.label
          }
        }
        if (e.target) {
          e.rows = e.rows.map(row => {
            const minIdx = findMinElementIndex(row, this[e.target], 'value')
            this.objForSave[e.target] = minIdx
            return row.map((item, itemIdx) => {
              return {
                ...item,
                ...{
                  class:
                    itemIdx === minIdx
                      ? 'bg-deep-orange text-white text-weight-bold shadow-3'
                      : ''
                }
              }
            }, this)
          }, this)
        }
        if (e.source) {
          this.objForSave[`${e.source}_value`] = this[e.source]
          e.rows = e.rows.map(row => {
            return row.map(item => {
              return { ...item, value: this[e.source] }
            }, this)
          }, this)
        }
        return { ...e }
      }, this)
    },
    onInteractiveCellClick (row, item) {
      if (row.mouseClick && this[row.mouseClick] !== undefined) {
        this.isInteractiveChangeCellData = true
        this[row.mouseClick] = item.value
        this.showLevels()
      }
    },
    onGadgetInput (val) {
      console.log(val)
      if (val.gadgetInput && this[val.gadgetInput] !== undefined) {
        this.isInteractiveChangeCellData = true
        this[val.gadgetInput] = val.gadget.model.value
      }
    },
    getPartPhaseLevel (part, phase) {
      if (this.results) {
        const phaseObj = this.results.find(
          e => e.part === part && e.phase === phase
        )
        if (phaseObj) return phaseObj.level
      }
      return 0
    },

    calcPartTwoFinalResult () {
      this.partTwoResultClear = this.partTwoResultAnswers +
        this.confidenceInSpeaking +
        this.speakingRate +
        this.usingOfCliche +
        this.interactivityOfSpeech +
        this.usingOfTheRussianLanguageInSpeech

      this.partTwoResult = findMinElement(talkTestLevels, this.partTwoResultClear)
    },

    setPartPhaseLevel (part, phase, level, recalc = true) {
      console.log('setPartPhaseLevel', part, phase, level)
      if (this.results) {
        const tmp = this.results.map(e => e)
        const idx = tmp.findIndex(
          e => e.part === part && e.phase === phase
        )

        if (idx >= 0) {
          const e = tmp[idx]
          tmp.splice(idx, 1, { ...e, level })
        } else {
          tmp.push({ part, phase, level })
        }

        this.results = tmp
      }

      if (this.isInteractiveChangeCellData) {
        this.saveResults(part, phase, level)
      }

      if (recalc) {
        this.calcPartTwoFinalResult()
      }

      this.isInteractiveChangeCellData = false
    },
    async saveResults (part, phase, level) {
      const { id } = this.user
      const { test, attempt } = this.attempt
      const answers = ''
      const extra = ''

      await this.save({
        id,
        attempt,
        test,
        part,
        phase,
        level,
        answers,
        extra
      })
    },
    loadResultAsFile (type) {
      const data = {
        student: this.user,
        manager: this.authUser,
        date: new Date(),
        results: this.objForSave
      }
      if (type === 'xlsx') {
        this.loadAsXLSX(data)
      }
    }
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
    partTwoResultAnswers () {
      return this.getPartPhaseLevel(2, categories.generalCommentOnOralAssessmentBands.phase)
    },
    confidenceInSpeaking: {
      get () {
        return this.getPartPhaseLevel(2, categories.confidenceInSpeaking.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.confidenceInSpeaking.phase, val)
      }
    },
    speakingRate: {
      get () {
        return this.getPartPhaseLevel(2, categories.speakingRate.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.speakingRate.phase, val)
      }
    },
    usingOfCliche: {
      get () {
        return this.getPartPhaseLevel(2, categories.usingOfCliche.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.usingOfCliche.phase, val)
      }
    },
    interactivityOfSpeech: {
      get () {
        return this.getPartPhaseLevel(2, categories.interactivityOfSpeech.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.interactivityOfSpeech.phase, val)
      }
    },
    usingOfTheRussianLanguageInSpeech: {
      get () {
        return this.getPartPhaseLevel(2, categories.usingOfTheRussianLanguageInSpeech.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.usingOfTheRussianLanguageInSpeech.phase, val)
      }
    },
    phoneticAndPronunciationSelect: {
      get () {
        return this.getPartPhaseLevel(2, categories.phoneticAndPronunciationSelect.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.phoneticAndPronunciationSelect.phase, val)
      }
    },
    partTwoResult: {
      get () {
        return this.getPartPhaseLevel(2, categories.partTwoResult.phase)
      },
      set (val) {
        this.setPartPhaseLevel(2, categories.partTwoResult.phase, val, false)
      }
    },
    partTwoResultClear: {
      get () {
        return this.getPartPhaseLevel(2, categories.partTwoResultClear.phase)
      },
      set (val) {
        return this.setPartPhaseLevel(2, categories.partTwoResultClear.phase, val, false)
      }
    },
    finalLevel () {
      return this.levelOne + this.partTwoResult
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

.matrix-col__interactive:hover {
  background-color: lime;
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
