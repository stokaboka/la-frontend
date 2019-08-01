<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">

      <div v-if="isLogged" class="column">
        <div v-if="isClosed">
          <q-banner rounded class="bg-secondary text-white shadow-3">
            <span class="text-h6" v-html="partone.noAttempts"></span>
          </q-banner>
        </div>
        <div v-else class="q=mt-lg row justify-start items-center">

          <div class="text-h6 text-grey-14">
            <p>{{partone.message[0]}}</p>
            <p>{{partone.message[1]}}</p>
            <ul>
              <li v-for="category in categories" :key="category.phase">
                <span class="text-weight-bold">{{category.label}}</span>, {{partone.message[4]}} {{category.time / 60}} {{partone.message[5]}};
              </li>
            </ul>
            <p>{{partone.message[2]}}</p>
            <p>{{partone.message[3]}}</p>
          </div>

          <div class="text-h6 text-grey-14">
            {{partone.message[6]}}
          </div>

          <q-btn
            :label="partone.buttons.start.label"
            color="primary"
            class="q-ma-md"
            @click="startLa()"
          >
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">{{partone.buttons.start.tooltip}}</q-tooltip>
          </q-btn>

          <q-btn
            v-if="existSavedResults"
            :label="partone.buttons.resume.label"
            color="primary"
            class="q-ma-md"
            @click="resumeLa()"
          >
            <q-tooltip content-class="bg-gray" content-style="font-size: 1rem">{{partone.buttons.resume.tooltip}}</q-tooltip>
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
    ...mapGetters('app', ['modules', 'leftDrawer', 'rightDrawer']),
    ...mapGetters('results', ['savedResults', 'lastSavedResult', 'existSavedResults', 'existAnonymousResults']),
    ...mapGetters('text', ['partone'])
  }
}
</script>

<style></style>
