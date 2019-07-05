<template>
  <div class="column justify-start items-center">
      <div v-if="filterComponent">
        <component
          :is="filterComponent"
          @filter-params-changed="onFilterParamsChanged">
        </component>
      </div>
      <div v-if="model">
        <view-data-table
          :model="model"
          :module="module"
          :params="params"
          :selection="selection"
          :selected-row="selectedRow"
          :hide-search-field="hideSearchField"
          :hide-columns-selector="hideColumnsSelector"
          :hide-grid-selector="hideGridSelector"
          @table-row-click="onTableRowClick"
        >
        </view-data-table>
      </div>
  </div>
</template>

<script>

import FilterUsers from './filters/FilterUsers'
import ViewDataTable from './ViewDataTable'

export default {
  name: 'Viewer',
  components: {
    ViewDataTable,
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
    hideSearchField: {
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
      console.log(this.module)
      if (this.module) return this.$store.state[this.module].model
      return null
    },
    filterComponent () {
      if (this.model) return this.model.filter
      return null
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
