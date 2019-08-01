<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">

      <la-about/>

      <router-view />

      <div v-if="!isLogged" class="column q-mt-md text-grey-14">
        <div>
          {{home.user.forResume}}
          <router-link :to="{ name: 'auth-signin' }">{{home.user.signIn}}</router-link>
          {{home.user.or}}
          <router-link :to="{ name: 'auth-register' }"
            >{{home.user.register}}</router-link
          >
        </div>
        <div class="row q-gutter-md q-mt-md">
          <q-btn
            :label="home.buttons.signIn"
            color="primary"
            @click="$router.push({ name: 'auth-signin' })"
          />
          <q-btn
            :label="home.buttons.register"
            color="secondary"
            @click="$router.push({ name: 'auth-register' })"
          />
        </div>

        <div class="q-mt-lg text-grey-14">
          <p >{{home.message.part1}} <a :href="links.cef" target="_blank"><q>CEFR</q></a> {{home.message.part2}} <a :href="links.svs" target="_blank"><q>{{home.message.part3}}</q></a></p>
          <p>{{home.message.part4}} <router-link :to="{ name: 'auth-signin' }">{{home.buttons.signIn}}</router-link> {{home.message.part5}} <router-link :to="{ name: 'auth-register' }">{{home.buttons.register}}</router-link> {{home.message.part6}}</p>
        </div>
        <div class="row">
          <q-btn
            :label="home.buttons.anonymous"
            color="secondary"
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
    ...mapGetters('users', ['isLogged', 'authUser']),
    ...mapGetters('text', ['home'])
  }
}
</script>

<style></style>
