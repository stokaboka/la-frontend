<template>
  <q-page padding>
    <div v-html="ending"></div>
    <div v-html="next"></div>

    <div class="row q-ma-md">
    <q-btn
      label="Продолжить тестирование"
      color="primary"
      class="q-ma-md"
      @click="$router.push({ name: 'la-two' })"
    />

    <q-btn
      label="Прерваться и продолжить позже"
      color="secondary"
      class="q-ma-md"
      @click="$router.push({ name: 'home' })"
    />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LaOneEnd',
  computed: {
    ...mapGetters('one', ['ending', 'next'])
  }
}
</script>

<style></style>
