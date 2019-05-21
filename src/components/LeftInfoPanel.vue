<template>
  <div class="column q-py-lg justify-start items-center shadow-4">
    <q-avatar  size="5rem" color="green" text-color="white">{{result}}</q-avatar>
    <div>из {{phaseQuestionsTotal}}</div>
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
    short () {
      return this.$store.getters[`${this.module.id}/short`]
    },
    result () {
      return this.$store.getters[`${this.module.id}/result`]
    }
  }

}
</script>

<style>
</style>
