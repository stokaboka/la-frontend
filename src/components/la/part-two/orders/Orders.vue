<template>
  <div class="column q-gutter-md">
    <div class="row q-gutter-md justify-start items-center">
      <span>Экспорт в:</span>
      <q-btn label="PDF" @click="saveAsFormat('pdf')" :disabled="!order">
        <q-tooltip transition-show="flip-right" transition-hide="flip-left">
          Сохранить выбранный план обучения в формате PDF
        </q-tooltip>
      </q-btn>
    </div>
    <editor
      module="orders"
      :selection="selection"
      :selected-row="order"
      :filter="orderParams"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onOrdersTableRowClick"
    ></editor>
    <editor
      module="orderdetails"
      :selection="selection"
      :selected-row="orderDetail"
      :filter="orderDetailsParams"
      :allow-insert="allowOrderDetailsInsert"
      hide-search-field
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onOrderDetailsTableRowClick"
    ></editor>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Editor from '../../../ui/table/Editor'
import { formatter } from '../../../../lib/formatter'

export default {
  name: 'Orders',
  components: { Editor },
  data () {
    return {
      selection: 'single',
      orderParams: '',
      orderDetailsParams: ''
    }
  },
  computed: {
    allowOrderDetailsInsert () {
      return !!this.order
    },
    ...mapGetters('users', ['user', 'fioUser']),
    ...mapGetters('orders', { order: 'order', orderModel: 'model' }),
    ...mapGetters('orderdetails', ['orderDetail'])
  },
  mounted () {
    this.setOrderParams(this.user)
    this.setOrderDetailsParams(this.order)
  },
  methods: {
    async saveAsFormat (format) {
      const { id, dt } = this.order
      const dtf = formatter({
        type: 'date',
        value: dt,
        format: 'DD.MM.YYYY'
      })

      const filename = `${this.orderModel.title} ${this.fioUser} от ${dtf}.${format}`

      await this.orderSaveAs({ id, format, filename })
    },
    onOrdersTableRowClick (row) {
      this.SET_ORDER(row)
      this.setOrderDetailsParams(row)
    },
    onOrderDetailsTableRowClick (row) {
      this.SET_ORDER_DETAIL(row)
    },
    setOrderParams (user) {
      if (user) this.orderParams = `/user/${user.id}`
      else this.orderParams = '/user/0'
    },
    setOrderDetailsParams (order) {
      if (order) this.orderDetailsParams = `/order/${order.id}`
      else this.orderDetailsParams = '/order/0'
    },
    ...mapMutations('orders', ['SET_ORDER']),
    ...mapMutations('orderdetails', ['SET_ORDER_DETAIL']),
    ...mapActions('orders', { orderSaveAs: 'saveAs' })

  },
  watch: {
    user (val) {
      this.setOrderParams(val.id)
    }
  }
}
</script>

<style></style>
