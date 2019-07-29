<template>
  <q-page class="column items-center" :class="{ 'justify-start': isAnonymous, 'justify-center': !isAnonymous}">

        <q-banner rounded class="banner__background text-white shadow-3 q-pa-lg">
          <div class="q-mb-md text-h4 text-weight-medium text-center">Поздравляем!</div>
          <div class="text-h5 text-center">
            <div class="text-center">Тестирование успешно пройдено.</div>
            <p v-if="!isAnonymous" class="text-center">Ваш менеджер свяжется с вами в течение суток</p>
          </div>
        </q-banner>

    <div v-if="isAnonymous" class="column q-gutter-md q-mt-md text-grey-14">
      <p>По результатам самостоятельного теста Вы набрали <strong class="text-black">{{finalLevel}}</strong> баллов.</p>

      <div>
        Это соответсвует:
        <ul>
          <li>уровень CEF:
            <q-chip class="shadow-2">
              <q-avatar icon="euro_symbol" color="secondary" text-color="white" />
              <strong>{{ finalLevelCEF.label }}</strong>
              <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Уровень CEF</q-tooltip>
            </q-chip>
            , набрано баллов: <strong class="text-black">{{finalLevelCEF.value}}</strong></li>
          <li>уровень <q>Свобода слова</q>:
            <q-chip class="shadow-2">
              <q-avatar icon="forum" color="primary" text-color="white" />
              <strong>{{ finalLevelSVS.level }}</strong>
              <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Уровень "Свобода слова"</q-tooltip>
            </q-chip>
            , набрано баллов: <strong class="text-black">{{finalLevelSVS.value}}</strong></li>
        </ul>
      </div>

      <div>
        Результаты по самостоятельному тесту:
        <div class="column text-black text-body2 shadow-3">
          <div class="row">
            <div class="col-2 q-pa-sm text-center q-table--bordered">Тест</div>
            <div class="col-1 q-pa-sm text-center q-table--bordered">Уровень</div>
            <div class="col q-pa-sm text-center q-table--bordered">Комментарий</div>
          </div>
          <div v-for="m in matrix" :key="m.category.phase" class="row" :class="m.category.labelClass">
            <div class="col-2 q-pa-sm q-table--bordered">{{m.category.label}}</div>
            <div class="col-1 q-pa-sm text-center q-table--bordered">{{m.level.value}}</div>
            <div class="col q-pa-sm q-table--bordered">{{m.description}}</div>
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
      finalLevelCEF: '',
      finalLevelSVS: '',
      finalLevel: 0,
      matrix: [],
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

      this.finalLevelCEF = findMinElement(finalTestResultEurope, this.finalLevel, 'value')
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

      this.matrix = await this.loadDescription({ test, results })
        .then(data =>
          matrix.map(m => {
            const d = data.find(d => d.part === m.category.part && d.phase === m.category.phase)
            if (d) {
              return { ...m, description: d.description }
            }
            return { ...m, description: '-' }
          })
          // data.map(e => {
          //   const category = Object.values(categories).find(
          //     ee => ee.part === e.part && ee.phase === e.phase
          //   )
          //   if (category) return { ...e, ...category }
          //   return e
          // })
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
