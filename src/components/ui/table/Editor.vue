<template>
  <div class="column justify-start items-center">
    <q-card>
      <q-card-section class="q-mb-md text-h6 bg-secondary text-white">
        <span>{{model.title}}</span>
      </q-card-section>
      <q-card-section v-if="filterComponent">
        <component
          :is="filterComponent"
          @filter-params-changed="onFilterParamsChanged">
        </component>
      </q-card-section>
      <q-card-section v-if="model">
        <editable-data-table
          :model="model"
          :module="module"
          :params="params"
          :selection="selection"
          :selected-row="selectedRow"
          :hide-columns-selector="hideColumnsSelector"
          :hide-grid-selector="hideGridSelector"
          @table-row-click="onTableRowClick"
        >
        </editable-data-table>
      </q-card-section>
    </q-card>
  </div>
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
    hideColumnsSelector: {
      type: Boolean,
      default () {
        return false
      },
      required: false
    },
    hideGridSelector: {
      type: Boolean,
      default () {
        return false
      },
      required: false
    },
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
