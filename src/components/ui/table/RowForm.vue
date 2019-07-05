<template>
    <q-card>
      <q-card-section v-if="title" class="row items-center text-h6 bg-secondary text-white">
        <span>{{title}}</span>
        <q-space />
        <q-btn v-if="edit" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section v-if="data" class="row q-gutter-sm justify-start items-start" :class="{'column': edit}">
          <div v-for="column in columns" :key="column.field">
            <div v-if="edit">
              <q-select
                  v-if="column.editor && column.editor.type === 'combobox'"
                  class="row-form__item-input"
                  filled
                  v-model="data[column.field]"
                  :options="column.editor.options"
                  :label="column.label"
                  :rules="[val => testRequired(val, column, 'Поле должно быть заполнено')]"
              ></q-select>
              <q-input
                v-else-if="column.type === 'date'"
                class="row-form__item-input"
                :label="column.label"
                autofocus
                autogrow
                dense
                v-model="data[column.field]"
                mask="##.##.####"
                :rules="[val => testRequired(val, column, 'Поле должно быть заполнено')]"
                >
                <template v-slot:append>
                  <q-icon name="event"/>
                </template>
              </q-input>
              <q-input
                v-else
                class="row-form__item-input"
                v-model="data[column.field]"
                :label="column.label"
                dense
                autofocus
                autogrow
                :type="column.type"
                :rules="[val => testRequired(val, column, 'Поле должно быть заполнено')]"
              ></q-input>
            </div>
            <div v-else-if="fieldNotEmpty(column)"
              class="column items-start q-pa-sm text-grey-14">
              <span class="q-mr-md row-form__item-label">{{ column.label }}</span>
              <div v-if="column.gadget">
                <q-select
                  v-if="column.gadget.type === 'combobox'"
                  filled
                  v-model="data[column.field]"
                  :options="column.gadget.options"
                  label="Filled"
                ></q-select>
                <q-chip
                  v-if="column.gadget.type === 'chip'"
                  class="shadow-2"
                >
                  <q-avatar v-bind="column.gadget.options" />
                  <strong>{{ format(data[column.field], column) }}</strong>
                  <q-tooltip v-if="column.gadget.options.tooltip" content-class="bg-gray" content-style="font-size: 1rem">
                    {{column.gadget.options.tooltip}}
                  </q-tooltip>
                </q-chip>
                <q-icon
                  v-if="column.gadget.type === 'icon'"
                  v-bind="column.gadget.options[data[column.field]]"
                ></q-icon>
                <q-toggle
                  v-if="column.gadget.type === 'toggle'"
                  v-model="data[column.field]"
                  v-bind="column.gadget.options"
                ></q-toggle>
              </div>
              <div v-else class="text-weight-medium row-form__item-box">
                {{ format(data[column.field], column) }}
              </div>
            </div>
            <div v-else></div>
          </div>
      </q-card-section>

      <q-card-section v-if="showActions" class="q-mt-md">
        <slot name="actions"></slot>
      </q-card-section>

      <q-card-section v-if="showMessages" class="q-mt-md">
        <slot name="message"></slot>
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
      required: false
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
    },
    showActions: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    },
    showMessages: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    },
    edit: {
      type: Boolean,
      default () {
        return false
      },
      required: false
    }
  },
  computed: {
    columns () {
      if (this.visibleColumns) return this.model.columns.filter(e => this.visibleColumns.includes(e.field))
      else return this.model.columns.filter(e => e.visible)
    },
    editableColumns () {
      return this.columns.filter(e => e.insert || e.update)
    }
  },
  methods: {
    validate () {
      for (const column of this.columns) {
        if (column.required) {
          if (!this.data[column.field]) {
            return false
          }
        }
      }
      return true
    },
    testRequired (val, column, message) {
      if (column.required) {
        return !!val || message
      }
      return true
    },
    fieldNotEmpty (column) {
      const val = this.data[column.field]
      return !(val === undefined || val === null) && val
    },
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

<style scoped>
  .row-form__item-label {
    color: gray;
    font-size: 0.75rem;
  }

  .row-form__item-input {
    min-width: 20rem;
    width: 100%;
  }

  .row-form__item-box {
    min-width: 2rem;
    border-bottom: 2px solid #027BE3;
  }
</style>
