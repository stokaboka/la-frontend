<template>
  <q-page padding>
    <editor
      module="results"
      selection="single"
      :filter="resultsFilter"
      :selected-row="attempt"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onTableRowClick"
    ></editor>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Editor from '../../components/ui/table/Editor'
export default {
  name: 'LaTwoUserAttempts',
  components: { Editor },
  data () {
    return {
      attempt: null,
      resultsFilter: ''
    }
  },
  computed: {
    ...mapGetters('users', ['user'])
  },
  methods: {
    onTableRowClick (row) {}
  },
  watch: {
    user (val) {
      this.resultsFilter = `/user/${val.id}`
    }
  }
}
</script>

<style>
</style>
