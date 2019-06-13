export default {
  module: 'results',
  suffix: 'results',
  key: 'id',
  title: 'Попытки прохождения теста',
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
    },
    {
      name: 'test',
      field: 'test',
      label: 'test',
      sortable: false,
      visible: false,
      update: false,
      insert: false
    },
    {
      name: 'part',
      field: 'part',
      label: 'Часть теста',
      sortable: false,
      visible: true,
      update: false,
      insert: false
    },
    {
      name: 'phase',
      field: 'phase',
      label: 'phase',
      sortable: false,
      visible: false,
      update: false,
      insert: false
    },
    {
      name: 'level',
      field: 'level',
      label: 'Достигнутый уровень',
      sortable: false,
      visible: true,
      update: false,
      insert: false
    },
    {
      name: 'answers',
      field: 'answers',
      label: 'answers',
      sortable: false,
      visible: false,
      update: false,
      insert: false
    },
    {
      name: 'extra',
      field: 'extra',
      label: 'extra',
      sortable: false,
      visible: false,
      update: false,
      insert: false
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
