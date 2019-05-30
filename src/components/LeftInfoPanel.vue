<template>
  <div class="column justify-start items-center q-gutter-md q-pa-md">
    <q-avatar size="6rem" color="green" text-color="white">{{result}}</q-avatar>
    <div>из {{phaseQuestionsTotal}} ({{category}}: {{questionIndex+1}}/{{questionsCount}})</div>
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
    ...mapGetters('questions', ['category', 'questionIndex', 'questionsCount', 'phaseQuestionsTotal']),
    ...mapGetters('test', ['description', 'result'])
  }

}
</script>

<style>
</style>
