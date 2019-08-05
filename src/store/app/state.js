// console.log(process.env)
export default {
  // title: 'Свобода слова - Language Assessment©',
  version: '0.3.19',
  mode: 'about',
  api: process.env.NODE_ENV === 'development' ? 'http://localhost:4444' : '',
  apiVersion: 'api/v1',
  allowResume: true,
  allowCancel: false,
  lockResume: false,
  leftDrawer: false,
  rightDrawer: false,
  module: '',
  test: 1,
  modules: [
    {
      id: 'one',
      route: 'part-one-phase-one',
      next: 'part-one-phase-two',
      // title: 'Часть 1.1.',
      // description: 'Оценка словарного запаса',
      // test: 1,
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
      route: 'part-one-phase-two',
      next: 'part-one-phase-tree',
      // title: 'Часть 1.2.',
      // description: 'Оценка грамматических знаний',
      // test: 1,
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
      route: 'part-one-phase-tree',
      next: 'part-one-end',
      // title: 'Часть 1.3.',
      // description: 'Оценка восприятия на слух',
      // test: 1,
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

  volume: 1,
  showAudioControls: false,

  // test: null,

  timer: {
    time: 0,
    total: 0
  },
  timerHint: '',

  showNext: true,

  testState: '',

  lastPhase: 3,

  background: {
    timeout: 15,
    index: 0,
    images: [
      'london-1572444_1920_1280.jpg',
      'bus-3913228_1920_1280.jpg',
      'capital-2653_1920_1280.jpg',
      'london-2540059_1920_1280.jpg',
      'lovat-lane-1903023_1920_1280.jpg',
      'phone-booth-203492_1920_1280.jpg',
      'tower-bridge-1938684_1920_1280.jpg'
    ].sort(() => Math.random() - 0.5)
  }
}
