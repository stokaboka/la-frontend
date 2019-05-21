console.log(process.env)
export default {
  title: 'Свобода слова - Language Assessment©',
  version: '0.2.0',
  api: process.env.NODE_ENV === 'development' ? 'http://localhost:4444' : '',
  allowResume: true,
  allowCancel: false,
  lockResume: false,
  leftDrawer: false,
  rightDrawer: false,
  module: '',
  modules: [
    { id: 'one', route: 'la-one', next: 'la-two' },
    { id: 'two', route: 'la-two', next: 'la-tree' },
    { id: 'tree', route: 'la-tree', next: 'la-end' },
    { id: 'end', route: 'la-end', next: 'home' }
  ]
}
