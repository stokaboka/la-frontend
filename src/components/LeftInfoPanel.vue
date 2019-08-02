<template>
    <div class="column justify-start items-center q-gutter-md q-pa-md">
      <digital-animation-tablo
        size="6rem"
        color="green"
        text-color="white"
        :value="result"
      ></digital-animation-tablo>
      <q-banner rounded class="text-grey-14 bg-white shadow-3">
        {{info.left.of}} <strong>{{ phaseQuestionsTotal }}</strong> ({{ category }}:
        {{ questionIndex + 1 }}/{{ questionsCount }})
      </q-banner>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DigitalAnimationTablo from './ui/elements/digital/DigitalAnimationTablo'
export default {
  name: 'LeftInfoPanel',
  components: { DigitalAnimationTablo },
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
    resultPercent () {
      if (this.questionsCount !== 0) {
        return (this.result * 100) / this.questionsCount
      }
      return 0
    },
    ...mapGetters('questions', [
      'category',
      'questionIndex',
      'questionsCount',
      'phaseQuestionsTotal'
    ]),
    ...mapGetters('app', ['description', 'result']),
    ...mapGetters('text', ['info'])
  }
}
</script>

<style></style>
