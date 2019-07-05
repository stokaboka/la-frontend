<template>
  <div class="column q-gutter-md">
    <editor
      module="orders"
      :selection="selection"
      :selected-row="order"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onOrdersTableRowClick"
    ></editor>
    <editor
      module="orderdetails"
      :selection="selection"
      :selected-row="orderDetail"
      :filter="orderParams"
      :allow-insert="allowOrderDetailsInsert"
      hide-search-field
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onOrderDetailsTableRowClick"
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
      selection: 'single',
      orderParams: ''
    }
  },
  computed: {
    allowOrderDetailsInsert () {
      return !!this.order
    },
    ...mapGetters('orders', ['order']),
    ...mapGetters('orderdetails', ['orderDetail'])
  },
  mounted () {
    this.setOrderFilterParams(this.order)
  },
  methods: {
    onOrdersTableRowClick (row) {
      this.SET_ORDER(row)
      this.setOrderFilterParams(row)
    },
    onOrderDetailsTableRowClick (row) {
      this.SET_ORDER_DETAIL(row)
    },
    setOrderFilterParams (order) {
      if (order) this.orderParams = `/order/${order.id}`
      else this.orderParams = '/order/0'
    },
    ...mapMutations('orders', ['SET_ORDER']),
    ...mapMutations('orderdetails', ['SET_ORDER_DETAIL'])

  }
}
</script>

<style></style>
