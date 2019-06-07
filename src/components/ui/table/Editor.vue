<template>
  <q-page class="column justify-start items-center">
    <div class="row">
      <span>{{model.title}}</span>
    </div>
    <component
      v-if="filterComponent"
      :is="filterComponent"
      @filter-params-changed="onFilterParamsChanged">
    </component>
    <editable-data-table
      title="Словари"
      :model="model"
      :params="params"
      :selection="selection"
      :selected-row="selectedRow"
      @table-row-click="onTableRowClick"
    >
    </editable-data-table>
  </q-page>
</template>

<script>

import EditableDataTable from './EditableDataTable'

import FilterUsers from './filters/FilterUsers'

export default {
  name: 'Editor',
  components: {
    EditableDataTable,
    FilterUsers
  },
  props: {
    selectedRow: {
      type: Object,
      default () {
        return null
      }
    },
    selection: {
      type: String,
      default () {
        return 'single'
      }
    },
    module: {
      type: String,
      required: true
    },
    filter: {
      type: String,
      default () {
        return ''
      },
      required: false
    }
  },
  data () {
    return {
      params: null
    }
  },
  mounted () {
    if (this.filter) {
      this.setFilterParams(this.filter)
    }
  },
  computed: {
    model () {
      return this.$store.getters[`${this.module}/model`]
    },
    filterComponent () {
      return this.$store.getters[`${this.module}/filter`]
    }
  },
  methods: {
    onTableRowClick (row) {
      this.$emit('table-row-click', row)
    },
    onFilterParamsChanged (params) {
      this.setFilterParams(params)
    },
    setFilterParams (params) {
      this.params = params
    }
  },
  watch: {
    filter (val) {
      this.setFilterParams(val)
    }
  }
}
</script>

<style></style>
