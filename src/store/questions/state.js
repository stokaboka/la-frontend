export default {
  test: 1,
  part: 1,
  phase: 1,
  category: 1,
  questionEditor: null,
  questions: [],
  total: 0,
  phaseQuestionsTotal: 0,
  questionIndex: 0,

  model: {
    key: 'id',
    title: 'Вопросы самостоятельного теста',
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
        name: 'test',
        field: 'test',
        label: 'Тест',
        align: 'left',
        sortable: true,
        visible: true,
        update: false,
        insert: false
      },
      {
        name: 'name',
        field: 'name',
        label: 'Наименование',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'part',
        field: 'part',
        label: 'Часть',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'phase',
        field: 'phase',
        label: 'Тестирование',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'category',
        field: 'category',
        label: 'Категория',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'type',
        field: 'type',
        label: 'Представление',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'question',
        field: 'question',
        label: 'Вопрос',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'answer',
        field: 'answer',
        label: 'Ответы',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'target',
        field: 'target',
        label: 'Цель',
        align: 'left',
        sortable: true,
        visible: false,
        update: true,
        insert: true
      },
      {
        name: 'weigths',
        field: 'weigths',
        label: 'Вес ответов',
        align: 'left',
        sortable: true,
        visible: true,
        update: true,
        insert: true
      },
      {
        name: 'audio',
        field: 'audio',
        label: 'Звуковой файл',
        align: 'left',
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
    query: true
  }

}
