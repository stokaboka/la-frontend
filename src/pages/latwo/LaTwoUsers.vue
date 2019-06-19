<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <editor
        module="users"
        :selection="selection"
        :selected-row="user"
        hide-columns-selector
        hide-grid-selector
        @table-row-click="onUsersTableRowClick"
      ></editor>
      <editor
        module="attempts"
        :selection="selection"
        :filter="attemptsParams"
        :selected-row="attempt"
        hide-search-field
        hide-columns-selector
        hide-grid-selector
        @table-row-click="onAttemptsTableRowClick"
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
      selection: 'single',
      attemptsParams: ''
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
    onAttemptsTableRowClick (row) {
      this.SET_ATTEMPT(row)
    },
    onUsersTableRowClick (row) {
      this.SET_USER(row)
      this.setUserFilterParams(row)
      this.SET_ATTEMPT(null)
    },
    setUserFilterParams (user) {
      if (user) this.attemptsParams = `/user/${user.id}`
      else this.attemptsParams = '/user/0'
    },
    ...mapMutations('attempts', ['SET_ATTEMPT']),
    ...mapMutations('users', ['SET_USER']),
    ...mapActions('users', ['usersList'])
  }
}
</script>

<style>
</style>
