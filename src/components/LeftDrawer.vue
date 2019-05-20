<template>
  <div>
  <div>{{short}}</div>
  <div>{{current}}</div>
  <div>{{total}}</div>
  </div>
</template>

<script>
export default {
  name: 'LeftDrawer',
  props: {
    module: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    short () {
      return this.$store.getters[`${this.module}/short`]
    },
    current () {
      return this.$store.getters[`${this.module}/current`]
    },
    total () {
      return this.$store.getters[`${this.module}/total`]
    }
  }

}
</script>

<style>
</style>
