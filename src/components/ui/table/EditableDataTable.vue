<template>
  <div>
  <q-table
    :loading="loading"
    :separator="separator"
    :selection="selection"
    :selected.sync="selected"
    :title="title"
    :data="data"
    :columns="columns"
    :visible-columns="tableVisibleColumns"
    :filter="filter"
    row-key="id"
    :pagination.sync="paginationControl"
    @request="request"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click.native="rowClick(props.row)">
        <q-td auto-width key="selected">
          <q-checkbox
            dense
            v-model="props.selected"
            @input="rowMark()"
          ></q-checkbox>
        </q-td>
        <q-td key="desc" :props="props">
          {{ props.row.name }}
          <q-btn
            dense
            round
            flat
            :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
            @click="props.expand = !props.expand"
          />
        </q-td>
        <q-td v-for="column in columns" :key="column.field" :props="props">

          <div v-if="column.gadget">
            <q-icon
              v-if="column.gadget.type === 'icon'"
              v-bind="column.gadget.options[props.row[column.field]]"
            ></q-icon>
            <q-chip
              v-if="column.gadget.type === 'chip'"
              v-bind="column.gadget.options"
              dense
              class="shadow-2"
            ></q-chip>
            <q-toggle
              v-if="column.gadget.type === 'toggle'"
              v-model="props.row[column.field]"
              v-bind="column.gadget.options"
              @input="onEditRow(props.row)"
            ></q-toggle>
          </div>
          <span v-else>{{ format(props.row[column.field], column) }}</span>
          <q-popup-edit
            v-if="false"
            v-model="props.row[column.field]"
            buttons
            :title="props.row[column.label]"
            @save="onEditRow(props.row)"
          >
            <q-input
              v-model="props.row[column.field]"
              dense
              autofocus
              :type="column.type"
            ></q-input>
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:top="props">
      <div class="q-mr-md text-h6">{{title}}</div>

      <q-space />

      <q-input
        v-if="!hideSearchField"
        debounce="300"
        v-model="filter"
        placeholder="Поиск"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-space />
      <div class="row q-gutter-md">
        <q-btn v-if="edit.insert" label="Создать" @click="onInsertRowClick">
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Создать новую запись
          </q-tooltip>
        </q-btn>
        <q-btn v-if="edit.update" :disabled="selected.length === 0" label="Редактировать" @click="onEditRowClick">
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Изменить запись
          </q-tooltip>
        </q-btn>
        <q-btn v-if="edit.delete" :disabled="selected.length === 0" label="Удалить" @click="onStartDeleteRowClick">
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Удалить запись
          </q-tooltip>
        </q-btn>
      </div>
      <q-space />

      <q-select
        v-if="!hideColumnsSelector"
        class="q-mr-md"
        v-model="tableVisibleColumns"
        multiple
        borderless
        dense
        options-dense
        display-value="Столбцы"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-select
        v-if="!hideGridSelector"
        :options="gridOptions"
        color="secondary"
        emit-value
        map-options
        :option-value="opt => opt.value"
        :option-label="opt => opt.label"
        hide-underline
        v-model="separator"
      ></q-select>

    </template>
  </q-table>

    <q-dialog
      v-model="editor.dialog"
      persistent
      square
      transition-show="scale"
      transition-hide="scale">
      <row-form
        class="dialog-form"
        :data="editor.row"
        title="Редактор записи"
        :model="model"
        :edit="true"
        :show-actions="true"
        :show-messages="false"
      >
        <template v-slot:actions>
          <div class="row q-gutter-md">
            <q-btn
              color="primary"
              label="Сохранить"
              v-close-popup
              @click="onEditRowAccept"
            >
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Сохранить измененнения
              </q-tooltip>
            </q-btn>

            <q-btn
              color="secondary"
              label="Отмена"
              v-close-popup
              @click="onEditRowReject"
            >
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Отменить измененнения
              </q-tooltip>
            </q-btn>
          </div>
        </template>
      </row-form>
    </q-dialog>

    <q-dialog v-model="editor.delete">
      <q-card>
        <q-card-section class="row items-center bg-warning">
          <q-avatar icon="warning" color="red" text-color="white" class="shadow-2"/>
          <span class="q-ml-sm">Вы удаляете запись</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Удалить" v-close-popup @click="onDeleteRowClick"/>
          <q-btn color="warning" text-color="black" label="Отмена" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
import { toDDMMYYYY, equalsObjects } from '../../../lib/utils'
import RowForm from './RowForm'

export default {
  name: 'EditableDataTable',
  components: { RowForm },
  props: {
    selection: {
      type: String,
      default () {
        return 'single'
      }
    },
    selectedRow: {
      type: Object,
      default () {
        return null
      }
    },
    module: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      default () {
        return {
          title: '',
          suffix: '',
          columns: []
        }
      },
      required: true
    },
    params: {
      type: String,
      default () {
        return ''
      },
      required: false
    },
    hideColumnsSelector: {
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
    hideGridSelector: {
      type: Boolean,
      default () {
        return false
      },
      required: false
    }
  },
  data () {
    return {
      editor: {
        dialog: false,
        row: null,
        mode: '',
        delete: false
      },
      filter: '',
      separator: 'cell',
      tableVisibleColumns: [],
      paginationControl: {
        sortBy: null,
        descending: false,
        rowsPerPage: 10,
        page: 1,
        rowsNumber: 0
      },
      selected: [],
      loadedParams: '*',
      gridOptions: [
        { label: 'Горизонтальные линии', value: 'horizontal' },
        { label: 'Вертикальные линии', value: 'vertical' },
        { label: 'Сетка', value: 'cell' },
        { label: 'Без линий', value: 'none' }
      ]
    }
  },
  mounted () {
    this.tableVisibleColumns = this.visibleColumns
    if (!this.filterComponent) {
      this.request({
        pagination: this.paginationControl,
        filter: this.filter
      })
    } else {
      this.initSelectedRow()
    }
  },
  computed: {
    showTopSlot () {
      return !this.hideSearchField || !this.hideGridSelector || !this.hideColumnsSelector
    },
    title () {
      return this.$store.state[this.module].model.title
    },
    columns () {
      return this.$store.state[this.module].model.columns.map(e => {
        if (e.type) {
          return e
        } else {
          return { ...e, type: 'text' }
        }
      })
    },
    visibleColumns () {
      return this.$store.state[this.module].model.columns.filter(e => e.visible).map(e => e.name)
    },
    data () {
      return this.$store.state[this.module].model.data
    },
    query () {
      return this.$store.state[this.module].model.query
    },
    edit () {
      return this.$store.state[this.module].model.edit
    },
    key () {
      return this.$store.state[this.module].model.key
    },
    rowsNumber () {
      return this.$store.state[this.module].model.rowsNumber
    },
    filterComponent () {
      return this.$store.state[this.module].model.filter
    },
    ...mapGetters('editor', ['loading', 'results', 'error'])
  },
  methods: {
    init () {
      this.tableVisibleColumns = this.visibleColumns
    },
    initSelectedRow () {
      const { selectedRow } = this
      if (selectedRow) {
        const idx = this.data.findIndex(e => equalsObjects(selectedRow, e), this)
        this.selected = idx >= 0 ? [selectedRow] : []
      } else {
        this.selected = []
      }
    },
    rowClick (row) {
      this.$emit('table-row-click', row)
      this.selected = [row]
    },
    async onEditRowAccept () {
      const row = { ...this.editor.row }
      const { module } = this
      if (this.editor.mode === 'INSERT') {
        this.insertRow({ module, row })
        const result = await this.insertModule({ module, data: row })
        console.log('result', result)
        this.rowClick(row)
      }
      if (this.editor.mode === 'UPDATE') {
        this.onEditRow(row)
      }
      this.editor.row = null
      this.editor.mode = ''
      this.editor.dialog = false
    },
    onEditRowReject () {
      this.editor.dialog = false
      this.editor.row = null
      this.editor.mode = ''
    },
    async onInsertRowClick () {
      const { module } = this
      this.editor.mode = 'INSERT'
      this.editor.row = await this.createRow({ module })
      this.editor.dialog = true
    },
    onEditRowClick () {
      if (this.selected.length > 0) {
        this.editor.mode = 'UPDATE'
        this.editor.row = this.selected[0]
        this.editor.dialog = true
      } else {
        this.$q.notify({
          message: 'Для редактирования нужно выбрать запись',
          color: 'warning',
          textColor: 'black'
        })
      }
    },
    onStartDeleteRowClick () {
      if (this.selected.length > 0) {
        this.editor.delete = true
      } else {
        this.$q.notify({
          message: 'Для удаления нужно выбрать запись',
          color: 'warning',
          textColor: 'black'
        })
      }
    },
    async onDeleteRowClick () {
      if (this.selected.length > 0) {
        const { module } = this
        const row = this.selected[0]
        this.editor.mode = ''
        this.editor.dialog = false
        const result = await this.deleteModule({ module, data: row })
        this.selected = []
        console.log('result', result)
      } else {
        this.$q.notify({
          message: 'Для удаления нужно выбрать запись',
          color: 'warning',
          textColor: 'black'
        })
      }
    },
    rowMark () {
      if (this.selected.length > 0) {
        this.$emit('table-row-click', this.selected[0])
      } else {
        this.$emit('table-row-click', null)
      }
    },
    async onEditRow (row) {
      const data = Object.assign({}, row)
      const { module } = this
      console.log('data', data)
      const result = await this.updateModule({ module, data })
      console.log('result', result)
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
    },

    async request ({ pagination, filter }) {
      let query = ''
      const { module } = this
      if (this.query || this.loadedParams !== this.params) {
        if (this.query) {
          let ap = []

          if (pagination.rowsPerPage > 0) {
            ap.push(`page=${pagination.page}`)
            ap.push(`limit=${pagination.rowsPerPage}`)
          }

          if (pagination.sortBy) {
            ap.push(`sortBy=${pagination.sortBy}`)
            ap.push(`descending=${pagination.descending}`)
          }

          if (filter) {
            ap.push(`filter=${filter}`)
          }

          if (ap.length > 0) {
            query = `?${ap.join('&')}`
          }
        } else {
          pagination.rowsPerPage = 0
        }

        query = `${this.params || ''}${query}`
        await this.loadModule({ module, query })

        this.loadedParams = this.params
      }

      pagination.rowsNumber = this.rowsNumber

      this.paginationControl = pagination

      this.initSelectedRow()
    },
    ...mapMutations('editor', { insertRow: 'INSERT_ROW' }),
    ...mapActions('editor', {
      loadModule: 'load',
      insertModule: 'insert',
      updateModule: 'update',
      deleteModule: 'remove',
      createRow: 'createRow'
    })
  },
  watch: {
    model (val) {
      this.init(val)
    },
    params (val) {
      this.request({
        pagination: this.paginationControl,
        filter: this.filter
      })
    }

    // selectedRow (val) {
    //   this.selected = val === null ? [] : [val]
    // }
  }
}
</script>

<style scoped>
.q-table th {
  padding: 6px 12px;
}
.q-table tbody td {
  height: auto;
}
.q-table td {
  padding: 6px 12px;
}

  .dialog-form {
    max-width: 60vw;
    max-height: 90vh;
  }
</style>
