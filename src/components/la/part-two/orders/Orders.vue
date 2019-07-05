<template>
  <div>
    <editor
      module="orders"
      :selection="selection"
      :selected-row="order"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onOrdersTableRowClick"
    ></editor>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Editor from '../../../ui/table/Editor'
export default {
  name: 'Orders',
  components: { Editor },
  data () {
    return {
      selection: 'single'
    }
  },
  computed: {
    ...mapGetters('orders', ['order'])
  },
  methods: {
    onOrdersTableRowClick (row) {
      this.SET_ORDER(row)
    },
    ...mapMutations('orders', ['SET_ORDER'])
  }
}
</script>

<style></style>
