import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      results: null
    }
  },
  computed: {
    ...mapGetters('app', ['test']),
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
    ...mapActions('results', { loadResults: 'load', save: 'save' }),
    ...mapActions('description', { loadDescription: 'load' }),
    ...mapActions('questions', {
      loadQuestions: 'load',
      loadCountQuestions: 'count'
    }),
    ...mapActions('reports', { loadReportFile: 'load', saveReport: 'save' })
  }
}
