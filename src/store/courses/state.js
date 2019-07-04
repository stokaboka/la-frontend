export default {
  data: null,
  course: null,

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
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        type: 'text'
      },
      {
        name: 'hours',
        field: 'hours',
        label: 'Часы',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        type: 'number'
      },
      {
        name: 'timing',
        field: 'timing',
        label: 'Время',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        type: 'text'
      },
      {
        name: 'price',
        field: 'price',
        label: 'Цена',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        type: 'number'
      },
      {
        name: 'rem',
        field: 'rem',
        label: 'Примечание',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        type: 'text'
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
