<template>
  <div class="q-mt-lg text-h5 text-grey-14">
    <p>
      <span class="text-primary text-weight-medium" v-html="about.title"></span>
      <span v-html="about.description"></span>
    </p>
    <p v-html="about.production"></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LaAbout',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('text', ['about'])
  }
}
</script>

<style scoped>
</style>
