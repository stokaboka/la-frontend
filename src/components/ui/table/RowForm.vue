<template>
    <q-card>
      <q-card-section class="text-h6 bg-secondary text-white">
        {{title}}
      </q-card-section>
      <q-card-section class="row justify-start items-start">
          <div v-for="column in columns" :key="column.field">
            <div
              v-if="data[column.field] != undefined"
              class="column items-start q-pa-sm text-grey-14"
            >
              <span class="q-mr-md text-subtitle2">{{ column.label }}</span>
              <div v-if="column.gadget">
                <q-icon
                  v-if="column.gadget.type === 'icon'"
                  v-bind="column.gadget.options[data[column.field]]"
                ></q-icon>
                <q-chip
                  v-if="column.gadget.type === 'chip'"
                  v-bind="column.gadget.options[data[column.field]]"
                  class="shadow-2"
                ></q-chip>
                <q-toggle
                  v-if="column.gadget.type === 'toggle'"
                  v-model="data[column.field]"
                  v-bind="column.gadget.options"
                ></q-toggle>
              </div>
              <div v-else class="text-weight-medium">
                {{ format(data[column.field], column) }}
              </div>
            </div>
          </div>
      </q-card-section>

      <q-card-section>
        <slot name="actions"></slot>
      </q-card-section>
    </q-card>
</template>

<script>
import { toDDMMYYYY } from '../../../lib/utils'
export default {
  name: 'RowForm',
  props: {
    data: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default () {
        return ''
      },
      required: false
    },
    visibleColumns: {
      type: Array,
      default () {
        return null
      },
      required: false
    }
  },
  computed: {
    columns () {
      if (this.visibleColumns) return this.model.columns.filter(e => this.visibleColumns.includes(e.field))
      else return this.model.columns.filter(e => e.visible)
    }
  },
  methods: {
    format (value, column) {
      if (column.mask) {
        switch (column.mask) {
          case 'DD-MM-YYYY':
            return toDDMMYYYY(value)
          default:
            return value
        }
      } else {
        return value
      }
    }
  }
}
</script>

<style></style>
