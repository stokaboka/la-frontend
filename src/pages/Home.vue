<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">

      <la-about/>

      <router-view />

      <div v-if="!isLogged" class="column q-mt-md text-grey-14">
        <div>
          Для продолжения
          <router-link :to="{ name: 'auth-signin' }">войдите</router-link>
          или
          <router-link :to="{ name: 'auth-register' }"
            >зарегистрируйтесь</router-link
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

        <div class="q-mt-lg text-grey-14">
          <p>Вы можете пройти первую (самостоятельную) часть теста анонимно. По окончании теста будет определен ваш ориентировочный уровень по методикам <a :href="links.cef" target="_blank"><q>CEFR</q></a> и <a :href="links.svs" target="_blank"><q>Свобода слова</q></a></p>
          <p>Для получения точного результата и рекомендаций необходимо <router-link :to="{ name: 'auth-signin' }">войти</router-link> или <router-link :to="{ name: 'auth-register' }">зарегистрироваться</router-link> и пройти самостоятельную и устную часть теста (общение с преподавателем).</p>
        </div>
        <div class="row">
          <q-btn
            label="Пройти тест без регистрации"
            color="secondary"
            class="q-ma-md"
            @click="anonymousLogin"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LaAbout from '../components/LaAbout'
export default {
  name: 'Home',
  components: { LaAbout },
  data () {
    return {
      links: {
        cef: 'https://ru.wikipedia.org/wiki/Общеевропейские_компетенции_владения_иностранным_языком',
        svs: 'https://www.lingvo-svoboda.ru/'
      }
    }
  },
  methods: {
    anonymousLogin () {
      this.SET_ANONYMOUS_USER()
      const name = 'part-one-home'
      this.$router.push({ name })
    },
    ...mapMutations('users', ['SET_ANONYMOUS_USER'])
  },
  computed: {
    ...mapGetters('users', [
      'isLogged',
      'authUser'
    ])
  }
}
</script>

<style></style>
