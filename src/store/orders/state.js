export default {
  data: null,
  order: null,

  model: {
    key: 'id',
    title: 'Курсы',
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
      }
    ],

    edit: {
      insert: true,
      update: true,
      delete: true
    },

    rowsNumber: 0,
    filter: '',

    params: false,
    query: true
  }
}
