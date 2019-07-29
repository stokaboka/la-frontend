<template>
  <div>
    <div class="column no-wrap q-table--bordered">
      <div class="row no-wrap q-gutter-x-md q-ma-sm items-center">

          <q-input type="text" v-model="nameTrainer" label="Тренер" :rules="[val => !!val || 'Вы не указали имя тренера']"/>

          <q-chip class="shadow-2">
            <q-avatar icon="done" color="orange" text-color="white" />
            <strong>{{finalLevel}}</strong>
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
              Набранные баллы
            </q-tooltip>
          </q-chip>
        <q-chip class="shadow-2">
          <q-avatar icon="euro_symbol" color="secondary" text-color="white" />
          <strong>{{finalLevelCEF.level}}</strong>
          <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
            Уровень CEF
          </q-tooltip>
        </q-chip>
        <q-chip class="shadow-2">
          <q-avatar icon="forum" color="primary" text-color="white" />
          <strong>{{finalLevelSVS.level}}</strong>
          <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
            Уровень <q>Свобода слова</q>
          </q-tooltip>
        </q-chip>
        <div class="row no-wrap q-gutter-x-md q-ma-sm items-center">
          <q-btn label="Сохранить" @click="onSaveResultsClick">
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
              Сохранить результат
            </q-tooltip>
          </q-btn>
          <span>Экспорт в:</span>
          <q-btn v-for="exp in exportFormats" :key="exp.format" :label="exp.format" @click="onExportResultsClick(exp)">
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">
              Сохранить результат и экспортировать в формат <strong>{{exp.format}}</strong>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div v-for="(r, rIndex) in matrix" :key="`r-${rIndex}`" class="column no-wrap">
        <div v-if="r.rows" class="row no-wrap">
          <div
            :class="r.labelClass"
            class="col-3 q-table--bordered items-center matrix-col matrix-col__font"
          >
            {{ r.label }}
          </div>

          <div class="column no-wrap col-9" :class="r.labelClass">
            <div
              v-if="r.gadget"
              class="col row no-wrap items-center"
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
              class="col row no-wrap items-stretch"
            >
              <div
                v-for="(rowItem, rowItemIndex) in row"
                :key="`c-${rowItemIndex}`"
                :class="[r.rowsClass, rowItem.class]"
                class="column no-wrap text-center vertical-middle q-table--bordered matrix-col matrix-col__font"
                @click="onInteractiveCellClick(r, rowItem)"
                @touchend="onInteractiveCellClick(r, rowItem)"
              >
                <span v-if="rowItem.label || rowItem.value">{{ showItemLabelValue(rowItem) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row no-wrap">
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
          class="column no-wrap"
        >
          <div class="column no-wrap">
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
  vocabularyLevelsMap,
  grammarLevelsMap,
  listeningLevelsMap,
  selfTestLevels,
  generalCommentOnOralAssessmentBands,
  confidenceInSpeaking,
  speakingRate,
  usingOfCliche,
  interactivityOfSpeech,
  usingOfTheRussianLanguageInSpeech,
  talkTestLevels,
  phoneticAndPronunciation,
  finalTestResultEurope,
  finalTestResultSVS,
  finalTestResultSVSDetail,
  finalTestResultSVSComplete
} from './constants'
import { findMinElementIndex, findMinElement } from '../../../lib/utils'
import { getPartPhaseLevel } from '../methods'

let currentNotify = null
const selectionClass = 'bg-deep-orange text-white text-weight-bold shadow-3'

export default {
  name: 'UserResultMatrix',
  mixins: [mixin],
  data () {
    return {
      lifeCycleState: 'INIT',
      nameTrainer: '',
      phoneticAndPronunciation: {
        options: phoneticAndPronunciation,
        model: null
      },
      descriptions: null,
      levelOne: 0,
      isInteractiveChangeCellData: false,
      matrix: [
        {
          label:
            'Общеевропейская Система Уровней Владения Иностранными Языками (CEF)',
          labelClass: 'bg-orange-1',
          rowsClass: 'bg-orange-1',
          target: 'finalLevel',
          rows: [
            finalTestResultEurope
          ]
        },

        {
          label: 'Система Уровней Владения Иностранными Языками Свободы Слова',
          labelClass: 'bg-white',
          target: 'finalLevel',
          rows: [
            finalTestResultSVS,
            finalTestResultSVSDetail
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
            vocabularyLevelsMap
            // vocabularyLevels.map(e => {
            //   return { value: e }
            // })
          ]
        },

        {
          ...categories.grammar,
          rows: [
            grammarLevelsMap
            // grammarLevels.map(e => {
            //   return { value: e }
            // })
          ]
        },

        {
          ...categories.listening,
          rows: [
            listeningLevelsMap
            // listeningLevels.map(e => {
            //   return { value: e }
            // })
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
    if (!this.nameTrainer) {
      this.nameTrainer = this.trainer
    }

    this.lifeCycleState = 'MOUNTED'
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
      this.saveLevels()
    },
    async initResults () {
      const { id } = this.user
      const { attempt } = this.attempt
      this.results = await this.loadResults({ id, attempt })

      this.levelOne = this.calcResultsPart(1)

      this.$emit('set-level-one', this.levelOne)
    },
    async initDescriptions () {
      const { test } = this.attempt
      const results = this.results.filter(e => e.phase < 7)

      this.descriptions = await this.loadDescription({ test, results })
        .then(data =>
          data.map(e => {
            const category = Object.values(categories).find(
              ee => ee.part === e.part && ee.phase === e.phase
            )
            if (category) return { ...e, ...category }
            return e
          })
        )
    },
    showItemLabelValue (rowItem) {
      if (rowItem.label) return rowItem.label
      else if (rowItem.value) return rowItem.value
      return ''
    },
    getReport () {
      const out = { descriptions: this.descriptions.map(e => {
        const { category, description, label, level, target } = e
        return { category, description, label, level, target }
      }) }
      this.matrix.forEach(e => {
        if (e.gadget) {
          const value = this[e.gadgetInput]
          const model = e.gadget.options.find(ee => ee.value === value)
          if (model) {
            out[`${e.gadgetInput}_value`] = model.label
          }
        }
        if (e.target) {
          e.rows.forEach(row => {
            const minIdx = findMinElementIndex(row, this[e.target], 'value')
            out[e.target] = minIdx
          }, this)
        }
        if (e.source) {
          out[`${e.source}_value`] = this[e.source]
        }
      }, this)

      out['finalLevelCEF'] = findMinElementIndex(finalTestResultEurope, this.finalLevel, 'value')
      out['finalLevelSVS'] = findMinElementIndex(finalTestResultSVS, this.finalLevel, 'value')
      out['finalLevelSVSDetail'] = findMinElementIndex(finalTestResultSVSDetail, this.finalLevel, 'value')

      out['finalLevelCEF_value'] = this.finalLevelCEF.level
      out['finalLevelSVS_value'] = this.finalLevelSVS.level
      out['finalLevel'] = findMinElementIndex(autoTestLevels, this.finalLevel)
      out['finalLevel_value'] = this.finalLevel

      return out
    },
    showLevels () {
      this.matrix = this.matrix.map(e => {
        if (e.gadget) {
          const val = this[e.gadgetInput]
          e.gadget.model = e.gadget.options.find(ee => ee.value === val)
        }
        if (e.target) {
          e.rows = e.rows.map(row => {
            const minIdx = findMinElementIndex(row, this[e.target], 'value')
            return row.map((item, itemIdx) => {
              return {
                ...item,
                ...{
                  class:
                    itemIdx === minIdx
                      ? item.cellClass ? `${selectionClass} ${item.cellClass}` : selectionClass
                      : item.cellClass ? item.cellClass : ''
                }
              }
            }, this)
          }, this)
        }
        if (e.source) {
          e.rows = e.rows.map(row => {
            return row.map(item => {
              return { ...item, value: this[e.source] }
            }, this)
          }, this)
        }
        return { ...e }
      }, this)
    },
    async onInteractiveCellClick (row, item) {
      if (row.mouseClick && this[row.mouseClick] !== undefined) {
        this.isInteractiveChangeCellData = true
        this[row.mouseClick] = item.value
        await this.initDescriptions()
        this.showLevels()
      }
    },
    onGadgetInput (val) {
      if (val.gadgetInput && this[val.gadgetInput] !== undefined) {
        this.isInteractiveChangeCellData = true
        this[val.gadgetInput] = val.gadget.model.value
      }
    },
    getPartPhaseLevel (part, phase) {
      return getPartPhaseLevel(this.results, part, phase)
      // if (this.results) {
      //   const phaseObj = this.results.find(
      //     e => e.part === part && e.phase === phase
      //   )
      //   if (phaseObj) return phaseObj.level
      // }
      // return 0
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
      const { id: idUser } = this.user
      const { test, attempt } = this.attempt
      const answers = ''
      // const extra = ''

      await this.saveResult({
        idUser,
        attempt,
        test,
        part,
        phase,
        level,
        answers
        // extra
      })
    },

    checkTrainerName () {
      if (!this.nameTrainer) {
        if (currentNotify) {
          currentNotify()
        }
        currentNotify = this.$q.notify({
          message: 'Вы не указали имя тренера',
          color: 'warning',
          textColor: 'black'
        })
      }
    },

    async saveLevels () {
      this.checkTrainerName()

      const { id: idUser } = this.user
      const { test, attempt } = this.attempt
      const {
        fioAuthUser: manager,
        nameTrainer: trainer,
        finalLevel: level,
        finalLevelCEF: levelCEF,
        finalLevelSVS: levelSVS
      } = this

      await this.saveLevel({
        idUser,
        attempt,
        test,
        level,
        levelCEF: levelCEF.level,
        levelSVS: levelSVS.level,
        manager,
        trainer
      })
    },

    async saveResultReport () {
      this.checkTrainerName()

      const type = 'result'

      const {
        fioUser: student,
        fioAuthUser: manager,
        nameTrainer: trainer,
        finalLevel: level,
        finalLevelCEF: levelCEF,
        finalLevelSVS: levelSVS
      } = this

      const { id: idUser } = this.user
      const { test, attempt } = this.attempt
      const date = new Date()
      const results = this.getReport()

      const data = { student, manager, trainer, date, results }
      const report = { type, idUser, attempt, test, data, level, levelCEF, levelSVS }

      await this.saveReport(report)
    },
    async loadResultAsFile (exp) {
      const { file, format } = exp
      const { id: user } = this.user
      const { test, attempt } = this.attempt
      const filename = this.parseTemplateString(file)
      const reportFileParams = { format, user, test, attempt, filename }

      await this.loadReportFile(reportFileParams)
    },

    async onSaveResultsClick () {
      await this.saveLevels()
      await this.saveResultReport()
    },

    async onExportResultsClick (exp) {
      await this.saveLevels()
      await this.saveResultReport()
      await this.loadResultAsFile(exp)
    }

  },
  computed: {
    finalLevelCEF () {
      const out = findMinElement(finalTestResultEurope, this.finalLevel, 'value')
      return out || ''
    },
    finalLevelSVS () {
      const out = findMinElement(finalTestResultSVSComplete, this.finalLevel, 'value')
      return out || ''
    },
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
  },
  watch: {
    finalLevel () {
      this.saveLevels()
    },
    trainer (val) {
      if (val) { this.nameTrainer = val }
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
