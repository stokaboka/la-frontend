<template>
  <div>

    <la-about/>

    <div v-if="isLogged" class="column q-mt-md">
      <div v-if="isClosed">
        <q-banner rounded class="bg-primary text-white shadow-3">
            <span class="text-h6">
              К сожалению, Вы использовали все попытки.
              <p>Обратитесь к своему менеджеру.</p>
            </span>
        </q-banner>
      </div>
      <div v-else>
        Вы можете начать тест
        <q-btn
          label="Продолжить"
          color="primary"
          class="q-ma-md"
          @click="startLa()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LaAbout from '../components/LaAbout'
export default {
  name: 'PhaseOne',
  components: { LaAbout },
  methods: {
    async startLa () {
      let name = 'la-one'
      if (this.isLogged) {
        await this.load()
        if (this.savedResults.length > 0) {
          const lastResult = this.savedResults[this.savedResults.length - 1]
          name = this.modules[lastResult.phase - 1].next
        }
      }

      name = 'la-one'
      // name = 'la-two'
      // name = 'la-tree'
      this.$router.push({ name })
    },
    ...mapActions('results', ['load'])
  },
  computed: {
    ...mapGetters('auth', [
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

<style>
</style>
