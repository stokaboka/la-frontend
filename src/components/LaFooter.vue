<template>
  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      {{ title }}
    </q-toolbar>
  </q-footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LaFooter',
  data () {
    return {}
  },
  computed: {
    showTitle () {
      return this.$route.meta.title
    },
    showTestTitle () {
      return this.showTitle && this.mode === 'test'
    },
    ...mapGetters('app', ['title', 'mode', 'description'])
  }
}
</script>

<style>
</style>
