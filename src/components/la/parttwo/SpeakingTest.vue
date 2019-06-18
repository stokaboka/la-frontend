<template>
  <div>SpeakingTest</div>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'SpeakingTest',
  mixins: [mixin],
  props: {
    partOneLevelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.initResults()
  },
  methods: {
  }
}
</script>

<style>
</style>
