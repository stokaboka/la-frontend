<template>
  <q-page padding>
    <div v-html="title"></div>
    <div v-html="description"></div>
    <q-btn
      label="Продолжить"
      color="primary"
      class="q-ma-md"
      @click="$router.push({ name: 'la-one-test' })"
    />
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'LaOne',
  mounted () {
    this.SET_MODULE('one')
    this.SET_LEFT_DRAWER(true)
  },
  methods: {
    ...mapMutations('app', ['SET_MODULE', 'SET_LEFT_DRAWER'])
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('app', ['api']),
    ...mapGetters('one', ['title', 'description'])
  }
}
</script>

<style>
</style>
