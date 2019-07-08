<template>
  <div>
    <q-card>
      <q-card-section
        v-if="title"
        class="row items-center text-h6 bg-secondary text-white"
      >
        <span>{{ title }}</span>
        <q-space />
        <q-btn v-if="edit" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        v-if="ready"
        class="row q-gutter-sm justify-start items-start"
        :class="{ column: edit }"
      >
        <div v-for="column in columns" :key="column.field">
          <div v-if="edit">
            <div
              v-if="column.editor && column.editor.type === 'lov'"
              class="row no-wrap q-gutter-sm"
            >
              <q-input
                class="row-form__item-input"
                v-model="rowData[column.field]"
                :label="column.label"
                :type="column.type"
                :rules="[val => testRequired(val, column)]"
                dense
                disabled
                autofocus
                autogrow
              ></q-input>
              <q-btn label="..." @click="openLov(column)" />
            </div>
            <q-select
              v-else-if="column.editor && column.editor.type === 'combobox'"
              class="row-form__item-input"
              filled
              v-model="rowData[column.field]"
              @blur="fieldChanged"
              :options="column.editor.options"
              :label="column.label"
              :rules="[val => testRequired(val, column)]"
            ></q-select>
            <q-input
              v-else-if="column.type === 'date1'"
              class="row-form__item-input"
              :label="column.label"
              autofocus
              autogrow
              dense
              @blur="fieldChanged"
              v-model="rowData[column.field]"
              type="date"
              :rules="[val => testRequired(val, column)]"
            >
              <template v-slot:append>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input
              v-else-if="column.type === 'date'"
              filled v-model="rowData[column.field]" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="rowData[column.field]"
                      mask="DD-MM-YYYY"
                      :locale="locale"
                      @input="onDateInputDialog" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-else
              class="row-form__item-input"
              v-model="rowData[column.field]"
              @blur="fieldChanged"
              :label="column.label"
              dense
              autofocus
              autogrow
              :type="column.type"
              :rules="[val => testRequired(val, column)]"
            ></q-input>
          </div>
          <div
            v-else-if="fieldNotEmpty(column)"
            class="column items-start q-pa-sm text-grey-14"
          >
            <span class="q-mr-md row-form__item-label">{{ column.label }}</span>
            <div v-if="column.gadget">
              <q-select
                v-if="column.gadget.type === 'combobox'"
                filled
                v-model="rowData[column.field]"
                :options="column.gadget.options"
                label="Filled"
              ></q-select>
              <q-chip v-if="column.gadget.type === 'chip'" class="shadow-2">
                <q-avatar v-bind="column.gadget.options" />
                <strong>{{ format(rowData[column.field], column) }}</strong>
                <q-tooltip
                  v-if="column.gadget.options.tooltip"
                  content-class="bg-gray"
                  content-style="font-size: 1rem"
                >
                  {{ column.gadget.options.tooltip }}
                </q-tooltip>
              </q-chip>
              <q-icon
                v-if="column.gadget.type === 'icon'"
                v-bind="column.gadget.options[rowData[column.field]]"
              ></q-icon>
              <q-toggle
                v-if="column.gadget.type === 'toggle'"
                v-model="rowData[column.field]"
                v-bind="column.gadget.options"
              ></q-toggle>
            </div>
            <div v-else class="text-weight-medium row-form__item-box">
              {{ format(rowData[column.field], column) }}
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

    <q-dialog
      v-model="lov.dialog"
      full-width
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="row items-center text-h6 bg-primary text-white">
          <span v-if="lov.column"
            >Список значений для <strong>{{ lov.column.label }}</strong></span
          >
        </q-card-section>
        <q-card-section>
          <viewer
            v-if="lov.module"
            :module="lov.module"
            :selection="lov.selection"
            :selected-row="lov.row"
            hide-columns-selector
            hide-grid-selector
            @table-row-click="onLovRowClick"
          ></viewer>
        </q-card-section>
        <q-card-actions align="right" class="row q-gutter-md">
          <q-btn
            label="OK"
            @click="onLovBtnClick(true)"
            :disabled="!lov.row"
            color="primary"
            v-close-popup
          ></q-btn>
          <q-btn
            label="Отмена"
            @click="onLovBtnClick(false)"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { formatter } from '../../../lib/formatter'
import Viewer from './Viewer'
import { validate } from '../../../lib/validator'
import { calculate } from '../../../lib/calculator'

const MESSAGES = {
  required: 'Поле должно быть заполнено'
}

const locale = {
  days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота',
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'
}

export default {
  name: 'RowForm',
  components: { Viewer },
  props: {
    row: {
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
  data () {
    return {
      rowData: { ...this.row },
      lov: {
        dialog: false,
        module: '',
        selection: 'single',
        row: null,
        column: null
      },
      locale: {
        /* starting with Sunday */
        days: locale.days.split('_'),
        daysShort: locale.days.split('_').map(e => e.substr(1, 3)),
        months: locale.months.split('_'),
        monthsShort: locale.months.split('_').map(e => e.substr(1, 3))
      }
    }
  },
  mounted () {
    this.rowData = { ...this.row }
  },
  computed: {
    ready () {
      if (this.rowData === undefined || this.rowData === null) {
        return false
      }
      return true
    },
    columns () {
      if (this.visibleColumns) {
        return this.model.columns.filter(e =>
          this.visibleColumns.includes(e.field)
        )
      } else return this.model.columns.filter(e => e.visible)
    },
    editableColumns () {
      return this.columns.filter(e => e.insert || e.update)
    }
  },
  methods: {
    onDateInputDialog (event) {
      console.log(event)
      this.$refs.qDateProxy[0].hide()
    },
    onInput (event, column) {
      if (column.type === 'date') {
        this.rowData[column.field] = new Date(event)
      } else {
        this.rowData[column.field] = event
      }
    },
    fieldChanged (event) {
      this.calculate()
    },
    openLov (column) {
      this.lov.module = column.editor.module
      this.lov.column = column
      this.lov.dialog = true
    },
    onLovRowClick (row) {
      this.lov.row = row
    },
    onLovBtnClick (action) {
      if (action) {
        const { bind } = this.lov.column.editor
        for (const bnd of bind) {
          this.rowData[bnd.to] = this.lov.row[bnd.from]
        }
        this.fieldChanged()
      }
      this.lov.dialog = false
      this.lov.module = ''
      this.lov.row = null
      this.lov.column = null
    },
    async validate () {
      const { rowData: row, columns } = this
      return validate({ row, columns })
    },
    calculate () {
      const { rowData: row, columns } = this
      calculate({ row, columns })
    },
    testRequired (val, column) {
      if (column.required) {
        return !!val || MESSAGES.required
      }
      return true
    },
    fieldNotEmpty (column) {
      const val = this.rowData[column.field]
      return !(val === undefined || val === null) && val
    },
    format (value, column) {
      if (column.mask) {
        const { type, mask: format } = column
        return formatter({ type, value, format })
      }
      return value
    }
  },
  watch: {
    row (val) {
      this.rowData = { ...val }
      this.calculate()
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
  border-bottom: 2px solid #027be3;
}
</style>
