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
        await this.load()
        if (this.savedResults.length > 0) {
          const lastResult = this.savedResults[this.savedResults.length - 1]
          name = this.modules[lastResult.phase - 1].next
        }
      }

      name = 'part-one-phase-one'
      // name = 'part-one-phase-two'
      // name = 'part-one-phase-tree'
      this.$router.push({ name })
    },
    ...mapActions('results', ['load'])
  },
  computed: {
    ...mapGetters('users', [
      'isLogged',
      'isClosed',
      'isAdmin',
      'isOperator',
      'isUser',
      'user'
    ]),
    ...mapGetters('app', ['title', 'modules', 'leftDrawer', 'rightDrawer']),
    ...mapGetters('results', ['savedResults'])
  }
}
</script>

<style></style>
