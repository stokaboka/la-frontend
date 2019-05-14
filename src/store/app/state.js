console.dir(process.env)
export default {
  title: 'Свобода слова - Language Assessment',
  version: '0.2.0',
  api: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : '',
  allowResume: true,
  allowCancel: false,
  lockResume: false
}
