export default {
  level: null,

  model: {
    key: 'id',
    title: 'Результат прохождения теста',
    data: [],

    columns: [
      {
        name: 'test',
        field: 'test',
        label: 'Тест',
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
        sortable: false,
        visible: false,
        update: false,
        insert: false
      },
      {
        name: 'dt',
        field: 'dt',
        label: 'Дата',
        type: 'date',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        mask: 'DD.MM.YYYY'
      },
      {
        name: 'level',
        field: 'level',
        label: 'Уровень',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        gadget: {
          type: 'chip',
          tooltip: 'Набранные баллы',
          options: {
            icon: 'done',
            color: 'orange',
            'text-color': 'white'
          }
        }
      },
      {
        name: 'levelCEFR',
        field: 'levelCEFR',
        label: 'Уровень CEFR',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        gadget: {
          type: 'chip',
          tooltip: 'Уровень CEFR',
          options: {
            icon: 'euro_symbol',
            color: 'secondary',
            'text-color': 'white'
          }
        }
      },
      {
        name: 'levelSVS',
        field: 'levelSVS',
        label: 'Уровень SVS',
        sortable: true,
        visible: true,
        update: false,
        insert: false,
        gadget: {
          type: 'chip',
          tooltip: 'Уровень "Свобода слова"',
          options: {
            icon: 'forum',
            color: 'primary',
            'text-color': 'white'
          }
        }
      },
      {
        name: 'manager',
        field: 'manager',
        label: 'Менеджер',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'trainer',
        field: 'trainer',
        label: 'Тренер',
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

    rowsNumber: 0,
    filter: '',

    params: true,
    query: false
  }
}
