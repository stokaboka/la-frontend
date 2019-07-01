import { mapActions, mapGetters } from 'vuex'
import { toDDMMYYYY } from '../../../lib/utils'

export default {
  data () {
    return {
      results: null
    }
  },
  computed: {
    ...mapGetters('app', ['test']),
    ...mapGetters('config', ['config', 'exportFormats']),
    ...mapGetters('users', ['user', 'authUser', 'fioUser', 'fioAuthUser']),
    ...mapGetters('results', ['savedResults']),
    ...mapGetters('attempts', ['attempt']),
    ...mapGetters('questions', ['questions'])
  },
  methods: {
    calcResultsPart (part) {
      return this.results
        .filter(e => e.part === part)
        .reduce((acc, e) => acc + e.level, 0)
    },
    parseTemplateString (template) {
      const date = new Date()
      return template
        .replace('{{USER_FIO}}', this.fioUser)
        .replace('{{DATE_NOW}}', toDDMMYYYY(date.toISOString()))
    },
    ...mapActions('results', { loadResults: 'load', save: 'save' }),
    ...mapActions('description', { loadDescription: 'load' }),
    ...mapActions('questions', {
      loadQuestions: 'load',
      loadCountQuestions: 'count'
    }),
    ...mapActions('reports', { loadReportFile: 'load', saveReport: 'save' })
  }
}
