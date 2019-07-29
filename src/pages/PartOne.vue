<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">
      <la-about />

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
              Чтобы начать тест нажмите:
            </div>

          <q-btn
            label="Продолжить"
            color="primary"
            class="q-ma-md"
            @click="startLa()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LaAbout from '../components/LaAbout'
export default {
  name: 'PhaseOne',
  components: { LaAbout },
  methods: {
    async startLa () {
      let name = 'part-one-phase-one'
      if (this.isLogged) {
        if (!this.isAnonymous) {
          await this.loadResults({ id: this.authUser.id, attempt: this.authUser.attempt })
        }
        const lastSavedResult = this.lastSavedResult()
        if (lastSavedResult) {
          name = this.modules[lastSavedResult.phase - 1].next
        }

        // if (this.savedResults.length > 0) {
        //   // const lastResult = this.savedResults[this.savedResults.length - 1]
        //   const lastResultList = this.savedResults
        //     .filter(e => e.part === 1)
        //     .sort((a, b) => b.phase - a.phase)
        //   if (lastResultList.length > 0) {
        //     const lastResult = lastResultList[0]
        //     name = this.modules[lastResult.phase - 1].next
        //   }
        // }
      }

      /**
       * TODO for debug
       * @type {string}
       */
      if (this.partOneDebug) {
        name = 'part-one-phase-one'
        // name = 'part-one-phase-two'
        // name = 'part-one-phase-tree'
      }
      this.$router.push({ name })
    },
    ...mapActions('results', { loadResults: 'load' })
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
    ...mapGetters('results', ['savedResults', 'lastSavedResult'])
  }
}
</script>

<style></style>
