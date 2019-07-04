export default {
  data: null,

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
      },
      {
        name: 'course',
        field: 'course',
        label: 'Курс',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'hours',
        field: 'hours',
        label: 'Часы',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'timing',
        field: 'timing',
        label: 'Время',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'price',
        field: 'price',
        label: 'Цена',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'rem',
        field: 'rem',
        label: 'Примечание',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      }

    ],
    edit: {
      insert: false,
      update: false,
      delete: false
    },

    rowsNumber: 0,
    filter: '',

    params: true,
    query: false
  }
}
