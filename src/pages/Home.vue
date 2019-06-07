<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">

      <la-about/>

      <router-view />

      <div v-if="!isLogged" class="column q-mt-md">
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

<script>
import { mapGetters } from 'vuex'
import LaAbout from '../components/LaAbout'
export default {
  name: 'Home',
  components: { LaAbout },
  computed: {
    ...mapGetters('auth', [
      'isLogged',
      'user'
    ])
  }
}
</script>

<style></style>
