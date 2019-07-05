export default {
  data: null,
  orderDetail: null,

  model: {
    key: 'id',
    title: 'Занятия',
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
        name: 'idOrder',
        field: 'idOrder',
        label: 'idOrder',
        sortable: false,
        visible: false,
        update: false,
        insert: false,
        source: {
          module: 'orders',
          getter: 'order',
          property: 'id'
        }
      },
      {
        name: 'num',
        field: 'num',
        label: '№',
        type: 'number',
        align: 'left',
        required: true,
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'course',
        field: 'course',
        label: 'Курс',
        editor: {
          type: 'lov',
          module: 'courses',
          bind: [
            { from: 'course', to: 'course' },
            { from: 'hours', to: 'hours' },
            { from: 'price', to: 'price' },
            { from: 'timing', to: 'timing' }
          ]
        },
        required: true,
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'target',
        field: 'target',
        label: 'Цель',
        required: true,
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'hours',
        field: 'hours',
        label: 'Часов',
        type: 'number',
        required: true,
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'price',
        field: 'price',
        label: 'Цена',
        type: 'number',
        required: true,
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'cost',
        field: 'cost',
        label: 'Стоимость',
        type: 'number',
        required: true,
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true,
        calculate: 'hours * price'
      },
      {
        name: 'timing',
        field: 'timing',
        label: 'Время проведения',
        required: true,
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'rem',
        field: 'rem',
        label: 'Комментарий',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      }
    ],

    edit: {
      insert: true,
      update: true,
      delete: true
    },

    rowsNumber: 0,
    filter: '',

    params: true,
    query: false
  }
}
