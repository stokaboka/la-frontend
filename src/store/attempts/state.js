export default {
  model: {
    key: 'id',
    title: 'Попытки прохождения теста',
    data: [],

    columns: [
      {
        name: 'test',
        field: 'test',
        label: 'Тест',
        sortable: false,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'attempt',
        field: 'attempt',
        label: 'Попытка',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'dt',
        field: 'dt',
        label: 'Дата',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        mask: 'DD-MM-YYYY'
      }
    ],
    edit: {
      insert: false,
      update: false,
      delete: false
    },

    rowsNumber: 0,
    filter: '',

    query: true
  }
}
