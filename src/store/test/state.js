export default {

  tests: [
    {
      id: 'one',
      title: 'Часть 1.1.',
      description: 'Оценка словарного запаса',
      test: 1,
      part: 1,
      phase: 1,
      maxCategory: 10,
      answers: [],
      results: [],
      level: 0,
      time: 20 * 60,
      waitReady: false
    },
    {
      id: 'two',
      title: 'Часть 1.2.',
      description: 'Оценка грамматических знаний',
      test: 1,
      part: 1,
      phase: 2,
      maxCategory: 4,
      answers: [],
      results: [],
      level: 0,
      time: 20 * 60,
      waitReady: false
    },
    {
      id: 'tree',
      title: 'Часть 1.3.',
      description: 'Оценка восприятия на слух',
      test: 1,
      part: 1,
      phase: 3,
      maxCategory: 4,
      answers: [],
      results: [],
      level: 0,
      time: 0,
      waitReady: true
    }
  ],

  test: null,
  index: -1,

  timer: {
    time: 0,
    total: 0
  },
  timerHint: ''
}
