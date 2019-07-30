<template>
  <q-page class="column items-center" :class="{ 'justify-start': isAnonymous, 'justify-center': !isAnonymous}">

        <q-banner rounded class="banner__background text-white shadow-3 q-pa-lg">
          <div class="q-mb-md text-h4 text-weight-medium text-center">Поздравляем!</div>
          <div class="text-h5 text-center">
            <div class="text-center">Тестирование успешно пройдено.</div>
            <p v-if="!isAnonymous" class="text-center">Ваш менеджер свяжется с вами в течение суток</p>
          </div>
        </q-banner>

    <div v-if="isAnonymous" class="column q-mt-md text-grey-14">

      <div class="row justify-start items-baseline">По результатам самостоятельного теста Вы набрали
        <q-chip square class="shadow-2">
          <q-avatar  color="positive" text-color="white"><strong>{{finalLevel}}</strong></q-avatar>
          <strong>баллов</strong>
          <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Всего набрано баллов</q-tooltip>
        </q-chip>
      </div>

      <div class="column">

        <div class="row justify-start items-baseline">
          <span>Ваш уровень согласно общеевропейской компетенции владения иностранным языком (CEFR): </span>
          <q-chip class="shadow-2">
            <q-avatar icon="euro_symbol" color="secondary" text-color="white" />
            <strong>{{ finalLevelCEFR.label }}</strong>
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Уровень CEFR</q-tooltip>
          </q-chip>
        </div>

        <div class="row justify-start items-baseline">
          <span>Ваш уровень по методике разработанной в <q>Свобода слова</q> - </span>
          <q-chip class="shadow-2">
            <q-avatar icon="forum" color="primary" text-color="white" />
            <strong>{{ finalLevelSVS.level }}</strong>
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Уровень "Свобода слова"</q-tooltip>
          </q-chip>
        </div>

      </div>

      <div class="q-mt-md">
        Комментарии по результатам самостоятельного теста:
        <div class="column text-black text-body2 shadow-3">
          <div class="row">
            <div v-for="c in model.columns" :key="c.name" :class="c.headerClass">{{c.title}}</div>
          </div>
          <div v-for="m in model.data" :key="m.phase" class="row" :class="m[model.rowClass]">
            <div v-for="cc in model.columns" :key="cc.name" :class="cc.cellClass">{{m[cc.name]}}</div>
          </div>
        </div>
      </div>

    </div>

  </q-page>
</template>

<script>

import { mapGetters } from 'vuex'
import mixin from './mixin'
import { calculateResultLevel, getPartPhaseLevel } from '../../components/la/methods'
import {
  categories,
  finalTestResultEurope,
  finalTestResultSVSComplete,
  grammarLevelsMap,
  listeningLevelsMap,
  vocabularyLevelsMap
} from '../../components/la/part-two/constants'
import { findMinElement } from '../../lib/utils'

export default {
  name: 'LaEnd',
  mixins: [mixin],

  mounted () {
    this.SET_LEFT_DRAWER(false)
    this.SET_RIGHT_DRAWER(false)
    this.SET_SHOW_NEXT(false)
    this.CLEAR_QUESTIONS()

    if (this.isAnonymous) {
      this.showAnonymousResult()
    }
  },

  data () {
    return {
      finalLevelCEFR: '',
      finalLevelSVS: '',
      finalLevel: 0,
      matrix: [],
      model: {
        key: 'phase',
        rowClass: 'rowClass',
        columns: [
          { name: 'label',
            title: 'Тест',
            headerClass: 'col-2 q-py-md text-center q-table--bordered',
            cellClass: 'col-2 q-pa-sm text-center q-table--bordered la-end__cell-wrap' },
          { name: 'value',
            title: 'Уровень',
            headerClass: 'col-2 q-py-md text-center q-table--bordered',
            cellClass: 'col-2 q-pa-sm text-center q-table--bordered' },
          { name: 'description',
            title: 'Комментарий',
            headerClass: 'col q-py-md text-center q-table--bordered',
            cellClass: 'col q-pa-sm q-table--bordered' }
        ],
        data: []
      },
      descriptions: []
    }
  },

  computed: {
    ...mapGetters('results', ['anonymousResults'])
  },

  methods: {
    async showAnonymousResult () {
      const { test, part } = this
      const results = this.anonymousResults.filter(e => e.phase < 7)

      this.finalLevel = calculateResultLevel(this.anonymousResults, part)

      this.finalLevelCEFR = findMinElement(finalTestResultEurope, this.finalLevel, 'value')
      this.finalLevelSVS = findMinElement(finalTestResultSVSComplete, this.finalLevel, 'value')

      const vocabularyLevel = getPartPhaseLevel(this.anonymousResults, 1, 1)
      const grammarLevel = getPartPhaseLevel(this.anonymousResults, 1, 2)
      const listeningLevel = getPartPhaseLevel(this.anonymousResults, 1, 3)

      const matrix = [
        {
          category: categories.vocabulary,
          result: vocabularyLevel,
          level: findMinElement(vocabularyLevelsMap, vocabularyLevel, 'value')
        },
        {
          category: categories.grammar,
          result: grammarLevel,
          level: findMinElement(grammarLevelsMap, grammarLevel, 'value')
        },
        {
          category: categories.listening,
          result: grammarLevel,
          level: findMinElement(listeningLevelsMap, listeningLevel, 'value')
        }
      ]

      this.model.data = await this.loadDescription({ test, results })
        .then(data =>
          matrix.map(m => {
            const d = data.find(d => d.part === m.category.part && d.phase === m.category.phase)
            const { labelClass: rowClass, label, phase } = m.category
            const { value } = m.level
            const description = d ? d.description : '-'
            return { phase, rowClass, label, value, description }
          })
        )
    }
  }
}
</script>

<style scoped>

  .banner__background {
    background: radial-gradient(circle, #1f9c40 0%, #247a42 100%)
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: "counter main timer";
  }

  .la-end__cell-wrap {
    overflow-wrap: break-word;
  }

  .la-block__rounded {
    border-radius: 3px;
    background-color: bisque;
  }

  @media (max-width: 762px) {
    .container {
      display: grid;
      grid-auto-rows: min-content;
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      grid-template-areas:
        "main main"
        "counter timer";
    }
  }

  .la-main {
    grid-area: main;
    background-color: white;
  }

</style>
