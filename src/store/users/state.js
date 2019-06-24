export default {
  authUser: null,
  user: null,
  users: [],
  totalCount: 0,

  model: {
    title: 'Пользователи',
    data: [],
    columns: [
      {
        name: 'id',
        field: 'id',
        label: 'id',
        sortable: true,
        visible: false,
        update: false,
        insert: false
      },
      {
        name: 'login',
        field: 'login',
        label: 'Логин',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'firstName',
        field: 'firstName',
        label: 'Имя',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'secondName',
        field: 'secondName',
        label: 'Отчество',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'lastName',
        field: 'lastName',
        label: 'Фамилия',
        align: 'left',
        sortable: true,
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
        name: 'lastDate',
        field: 'lastDate',
        label: 'Дата',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        mask: 'DD-MM-YYYY'
      },
      {
        name: 'closed',
        field: 'closed',
        label: 'Блокировка',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        gadget: {
          // type: 'chip',
          type: 'icon',
          options: {
            0: {
              // label: null,
              name: 'check_circle',
              color: 'green',
              size: '2rem'
              // 'text-color': 'white'
            },
            1: {
              // label: null,
              name: 'cancel',
              color: 'red',
              size: '2rem'
              // 'text-color': 'white'
            }
          }
          // options: {
          //   label: '',
          //   color: 'red',
          //   'checked-icon': 'check',
          //   'unchecked-icon': 'clear',
          //   'false-value': 0,
          //   'true-value': 1
          // }
        }
      },
      {
        name: 'birthday',
        field: 'birthday',
        label: 'Дата рождения',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        mask: 'DD-MM-YYYY'
      },
      {
        name: 'role',
        field: 'role',
        label: 'Группа',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      }
    ],
    edit: {
      insert: false,
      update: false,
      delete: false
    },
    key: 'id',
    rowsNumber: 0,
    filter: '',

    params: false,
    query: true
  }
}
