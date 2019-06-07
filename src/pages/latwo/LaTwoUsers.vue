<template>
  <q-page padding>
    <editor
      module="users"
      :selection="selection"
      :selected-row="user"
      @table-row-click="onTableRowClick"
    ></editor>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Editor from '../../components/ui/table/Editor'
export default {
  name: 'LaTwoUsers',
  components: { Editor },
  data () {
    return {
      selection: 'single',
      user: null
    }
  },
  async mounted () {
    await this.usersList(null)
  },
  computed: {
    ...mapGetters('users', ['users'])
  },
  methods: {
    onTableRowClick (row) {
      this.user = row
    },
    ...mapActions('users', ['usersList'])
  }
}
</script>

<style>
</style>
