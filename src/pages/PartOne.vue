<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">

      <div v-if="isLogged" class="column">
        <div v-if="isClosed">
          <q-banner rounded class="bg-secondary text-white shadow-3">
            <span class="text-h6">
              К сожалению, Вы использовали все попытки.
              <p>Обратитесь к своему менеджеру.</p>
            </span>
          </q-banner>
        </div>
        <div v-else class="q=mt-lg row justify-start items-center">

          <div class="text-h6 text-grey-14">
            <p>Ваша задача - пройти самостоятельно первую часть теста.</p>
            <p>Первая часть состоит из трех заданий:</p>
            <ul>
              <li v-for="category in categories" :key="category.phase">
                <span class="text-weight-bold">{{category.label}}</span>, примерное время {{category.time / 60}} минут;
              </li>
            </ul>
            <p>Для прохождения первой части теста Вам потребуется примерно один час.</p>
            <p>Вы можете проходить тест по частям, результаты законченной части теста будут сохранены и использованы при продолжении тестирования.</p>
          </div>

          <div class="text-h6 text-grey-14">
            Чтобы начать тест нажмите:
          </div>

          <q-btn
            label="Начать"
            color="primary"
            class="q-ma-md"
            @click="startLa()"
          >
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Начать с начала</q-tooltip>
          </q-btn>

          <q-btn
            v-if="existSavedResults"
            label="Продолжить"
            color="primary"
            class="q-ma-md"
            @click="resumeLa()"
          >
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">Продолжить прерванный тест</q-tooltip>
          </q-btn>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import LaAbout from '../components/LaAbout'
import { categories } from '../components/la/part-two/constants'

export default {
  name: 'PhaseOne',
  // components: { LaAbout },
  data () {
    return {
      categories: Object.values(categories).filter(e => e.part === 1)
    }
  },
  async mounted () {
    if (this.isLogged) {
      this.loadSavedResults()
    }
  },
  methods: {
    async loadSavedResults () {
      if (this.isAnonymous) {
        await this.loadAnonymousResults()
      } else {
        await this.loadResults({ id: this.authUser.id, attempt: this.authUser.attempt })
      }
    },
    runLa (name) {
      if (this.partOneDebug) {
        name = 'part-one-phase-one'
        // name = 'part-one-phase-two'
        // name = 'part-one-phase-tree'
      }
      this.$router.push({ name })
    },
    async startLa () {
      let name = 'part-one-phase-one'
      this.CLEAR_ANONYMOUS_RESULT()
      this.CLEAR_SAVED_RESULTS()
      this.runLa(name)
    },
    async resumeLa () {
      let name = 'part-one-phase-one'
      if (this.isLogged) {
        this.loadSavedResults()

        const lastResult = this.lastSavedResult
        if (lastResult) {
          name = this.modules[lastResult.phase - 1].next
        }
      }

      this.runLa(name)
    },
    ...mapMutations('results', ['CLEAR_ANONYMOUS_RESULT', 'CLEAR_SAVED_RESULTS']),
    ...mapActions('results', { loadResults: 'load', loadAnonymousResults: 'loadAnonymous' })
  },
  computed: {
    ...mapGetters('config', { partOneDebug: 'partOneDebug' }),
    ...mapGetters('users', [
      'isLogged',
      'isClosed',
      'isAdmin',
      'isOperator',
      'isUser',
      'isAnonymous',
      'authUser'
    ]),
    ...mapGetters('app', ['title', 'modules', 'leftDrawer', 'rightDrawer']),
    ...mapGetters('results', ['savedResults', 'lastSavedResult', 'existSavedResults', 'existAnonymousResults'])
  }
}
</script>

<style></style>
