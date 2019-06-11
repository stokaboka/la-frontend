export default {
  module: 'results',
  suffix: 'results',
  key: 'id',
  result: '',
  error: '',
  title: 'Тестирование часть 1',
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
      label: 'dt',
      sortable: true,
      visible: true,
      update: false,
      insert: false
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
      label: 'part',
      sortable: false,
      visible: false,
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
      label: 'level',
      sortable: false,
      visible: false,
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

  loading: false,
  rowsNumber: 0,
  filter: '',
  query: true,

  lastQuery: ''
}
