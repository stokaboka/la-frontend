<template>
  <div class="column justify-start items-center q-pa-md">
    <q-avatar  size="6rem" color="green" text-color="white">{{result}}</q-avatar>
    <div class="q-mt-lg">из {{phaseQuestionsTotal}}</div>
    <div>({{category}}: {{current+1}}/{{questionsCount}})</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LeftInfoPanel',
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('questions', ['category', 'current', 'questionsCount', 'phaseQuestionsTotal']),
    ...mapGetters('test', ['short', 'result'])
    // short () {
    //   return this.$store.getters[`${this.module.id}/short`]
    // },
    // result () {
    //   return this.$store.getters[`${this.module.id}/result`]
    // }
  }

}
</script>

<style>
</style>
