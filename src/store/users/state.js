export default {
  authUser: null,
  user: null,
  users: [],
  totalCount: 0,

  // editor
  title: 'Пользователи',
  suffix: 'users',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'login', field: 'login', label: 'Логин', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'firstName', field: 'firstName', label: 'Имя', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'secondName', field: 'secondName', label: 'Отчество', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'lastName', field: 'lastName', label: 'Фамилия', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'birthday', field: 'birthday', label: 'Дата рождения', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'role', field: 'role', label: 'Группа', sortable: true, visible: true, update: false, insert: false }
  ],
  filter: '',
  query: true
}
