import { finalTestResultEurope, finalTestResultSVSComplete } from '../../components/la/part-two/constants'

export default {
  data: null,
  order: null,

  model: {
    key: 'id',
    title: 'План обучения',
    data: [],
    columns: [
      {
        name: 'id',
        field: 'id',
        label: 'id',
        sortable: false,
        visible: false,
        update: false,
        insert: false
      },
      {
        name: 'idUser',
        field: 'idUser',
        label: 'idUser',
        sortable: false,
        visible: false,
        update: false,
        insert: false,
        source: {
          module: 'users',
          getter: 'user',
          property: 'id'
        }
      },
      {
        name: 'dt',
        field: 'dt',
        label: 'Дата',
        type: 'date',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        mask: 'DD.MM.YYYY',
        default: () => {
          return new Date().toISOString()
        }
      },

      {
        name: 'currentLevelCEFR',
        field: 'currentLevelCEFR',
        label: 'Уровень CEFR',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        source: {
          module: 'levels',
          getter: 'level',
          property: 'levelCEFR'
        }
      },

      {
        name: 'currentLevelSVS',
        field: 'currentLevelSVS',
        label: 'Уровень "Свобода слова"',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        source: {
          module: 'levels',
          getter: 'level',
          property: 'levelSVS'
        }
      },

      {
        name: 'targetLevelCEFR',
        field: 'targetLevelCEFR',
        label: 'Цель CEFR',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        editor: {
          type: 'combobox',
          tooltip: 'Цель CEFR',
          options: finalTestResultEurope.map(e => e.level)
        }
      },

      {
        name: 'targetLevelSVS',
        field: 'targetLevelSVS',
        label: 'Цель "Свобода слова"',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        editor: {
          type: 'combobox',
          tooltip: 'Цель "Свобода слова"',
          options: finalTestResultSVSComplete.map(e => e.level)
        }
      },

      {
        name: 'student',
        field: 'student',
        label: 'Пользователь',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        source: {
          module: 'users',
          getter: 'fioUser'
        }
      },
      {
        name: 'manager',
        field: 'manager',
        label: 'Менеджер',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        source: {
          module: 'users',
          getter: 'fioAuthUser'
        }
      },
      {
        name: 'trainer',
        field: 'trainer',
        label: 'Тренер',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        required: true,
        align: 'left',
        source: {
          module: 'levels',
          column: 'trainer',
          row: 0
        }
      }
    ],

    relations: [
      'orderdetails'
    ],

    edit: {
      insert: true,
      update: true,
      delete: true
    },

    rowsNumber: 0,
    filter: '',

    params: true,
    query: true
  }
}
