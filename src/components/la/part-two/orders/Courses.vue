<template>
  <div>
    <editor
      module="courses"
      :selection="selection"
      :selected-row="course"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onTableRowClick"
    ></editor>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import Editor from '../../../ui/table/Editor'

export default {
  name: 'Courses',
  components: { Editor },
  data () {
    return {
      selection: 'single'
    }
  },
  computed: {
    ...mapGetters('courses', ['course'])
  },
  methods: {
    onTableRowClick (row) {
      this.SET_COURSE(row)
    },
    ...mapMutations('courses', ['SET_COURSE'])
  }
}
</script>

<style>
</style>
