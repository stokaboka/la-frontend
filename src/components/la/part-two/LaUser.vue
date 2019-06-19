<template>
  <div class="q-ma-lg">
    <div v-if="user">
      <div class="q-pa-sm text-h6 bg-secondary text-white">
        {{title}}
      </div>
      <div class="row justify-start items-start">
          <div v-for="column in columns" :key="column.field">
            <div
              v-if="user[column.field] != undefined"
              class="column items-start q-pa-sm text-grey-14"
            >
              <span class="q-mr-md text-subtitle2">{{ column.label }}</span>
              <div v-if="column.gadget">
                <q-icon
                  v-if="column.gadget.type === 'icon'"
                  v-bind="column.gadget.options[user[column.field]]"
                ></q-icon>
                <q-chip
                  v-if="column.gadget.type === 'chip'"
                  v-bind="column.gadget.options[user[column.field]]"
                  class="shadow-2"
                ></q-chip>
                <q-toggle
                  v-if="column.gadget.type === 'toggle'"
                  v-model="user[column.field]"
                  v-bind="column.gadget.options"
                ></q-toggle>
              </div>
              <div v-else class="text-weight-medium">
                {{ user[column.field] }}
              </div>
            </div>
          </div>
      </div>

      <slot name="actions"></slot>

      <q-separator />

    </div>
  </div>
</template>

<script>

export default {
  name: 'LaUser',
  props: {
    user: {
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
  }
}
</script>

<style></style>
