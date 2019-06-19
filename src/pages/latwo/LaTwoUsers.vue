<template>
  <q-page padding>
    <div class="row">
      <editor
        module="users"
        :selection="selection"
        :selected-row="user"
        hide-columns-selector
        hide-grid-selector
        @table-row-click="onTableRowClick"
      ></editor>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Editor from '../../components/ui/table/Editor'
export default {
  name: 'LaTwoUsers',
  components: { Editor },
  data () {
    return {
      selection: 'single'
    }
  },
  computed: {
    ...mapGetters('users', ['user'])
  },
  methods: {
    onTableRowClick (row) {
      this.SET_USER(row)
    },
    ...mapMutations('users', ['SET_USER']),
    ...mapActions('users', ['usersList'])
  }
}
</script>

<style>
</style>
