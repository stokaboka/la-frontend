<template>
    <div class="column justify-start items-center q-gutter-md q-pa-md">
      <digital-animation-tablo
        size="6rem"
        color="green"
        text-color="white"
        :value="result"
      ></digital-animation-tablo>
      <div class="text-grey-14">
        из <strong>{{ phaseQuestionsTotal }}</strong> ({{ category }}:
        {{ questionIndex + 1 }}/{{ questionsCount }})
      </div>
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
    ...mapGetters('app', ['description', 'result'])
  }
}
</script>

<style></style>
