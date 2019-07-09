<template>
  <div class="column justify-start items-start">
      <div v-if="filterComponent">
        <component
          :is="filterComponent"
          @filter-params-changed="onFilterParamsChanged">
        </component>
      </div>
      <div v-if="model">
        <editable-data-table
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
        </editable-data-table>
      </div>
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
    },
    allowInsert: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    },
    allowUpdate: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    },
    allowDelete: {
      type: Boolean,
      default () {
        return true
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
      // return this.$store.getters[`${this.module}/model`]
      return this.$store.state[this.module].model
    },
    filterComponent () {
      // return this.$store.getters[`${this.module}/filter`]
      return this.$store.state[this.module].model.filter
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
