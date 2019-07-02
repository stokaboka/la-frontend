export default {
  config: {
    'result': {
      'export': {
        'pdf': 'результат Language Assessment {{USER_FIO}} от {{DATE_NOW}}.pdf',
        'excel': 'результат Language Assessment {{USER_FIO}} от {{DATE_NOW}}.xlsx'
      }
    },
    'part': {
      'one': {},
      'two': {
        'categoryDefaultValue': 3,
        'questionsNum': 10
      }
    }
  }

}
