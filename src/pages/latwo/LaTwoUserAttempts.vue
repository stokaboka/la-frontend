<template>
  <q-page padding>
    <editor
      module="attempts"
      selection="single"
      :filter="params"
      :selected-row="attempt"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onTableRowClick"
    ></editor>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Editor from '../../components/ui/table/Editor'
export default {
  name: 'LaTwoUserAttempts',
  components: { Editor },
  data () {
    return {
      params: ''
    }
  },
  mounted () {
    this.setUserFilterParams(this.user)
  },
  computed: {
    ...mapGetters('users', ['user']),
    ...mapGetters('attempts', ['attempt'])
  },
  methods: {
    setUserFilterParams (user) {
      if (user) this.params = `/user/${user.id}`
      else this.params = '/user/0'
    },
    onTableRowClick (row) {
      this.SET_ATTEMPT(row)
    },
    ...mapMutations('attempts', ['SET_ATTEMPT'])
  },
  watch: {
    user (val) {
      this.setUserFilterParams(val)
    }
  }
}
</script>

<style>
</style>
