<template>
  <q-page class="">
    <div class="wrapper row">
      <!--      <img src="~assets/svs_logo.png" />-->

      <div class="text-h5 text-grey-14">
        <p>
          <strong>Language Assessment ©</strong> - уникальная эффективная
          система оценки знаний английского языка и отслеживания прогресса
          студента, изучающего язык. Разработана методистами языкового
          тренингового центра <q>Свобода слова</q> на базе международных
          стандартов.
        </p>
      </div>

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
      <div v-else class="column q-mt-md">
        <div>
          Для продолжения вы должны
          <router-link :to="{ name: 'auth-signin' }">войти</router-link>
          или
          <router-link :to="{ name: 'auth-register' }"
            >зарегистрироваться</router-link
          >
        </div>
        <div class="row  q-mt-md">
          <q-btn
            label="Войти"
            color="primary"
            class="q-ma-md"
            @click="$router.push({ name: 'auth-signin' })"
          />
          <q-btn
            label="Зарегистрироваться"
            color="secondary"
            class="q-ma-md"
            @click="$router.push({ name: 'auth-register' })"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.wrapper {
  padding: 1rem 20%;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
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
