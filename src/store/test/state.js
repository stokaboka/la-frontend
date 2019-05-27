export default {

  tests: [
    {
      id: 'one',
      short: 'Часть I',
      test: 1,
      part: 1,
      phase: 1,
      maxCategory: 10,
      answers: [],
      results: [],
      time: 20 * 60
    },
    {
      id: 'two',
      short: 'Часть II',
      test: 1,
      part: 1,
      phase: 2,
      maxCategory: 4,
      answers: [],
      results: [],
      time: 20 * 60
    },
    {
      id: 'tree',
      short: 'Часть III',
      test: 1,
      part: 1,
      phase: 3,
      maxCategory: 4,
      answers: [],
      results: [],
      time: 0
    }
  ],

  current: null,
  index: -1,

  timer: {
    time: 0,
    total: 0
  },
  timerHint: ''
}
