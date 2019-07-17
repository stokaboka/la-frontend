import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: []
    }
  },

  computed: {
    ...mapGetters('users', ['isLogged', 'authUser']),
    ...mapGetters('app', ['api'])
  },

  methods: {
    ...mapActions('auth', ['signin', 'register']),
    getFormItemIndexByName (name) {
      return this.getItemByName(this.form, name)
    },
    getFormItemByName (name) {
      return this.getItemByName(this.form, name)
    },
    getItemIconByName (item, icon) {
      return this.getItemByName(item.icons, name)
    },
    getItemByName (list, name) {
      return list.find(e => e.name === name)
    },
    getItemIndexByName (list, name) {
      return list.findIndex(e => e.name === name)
    },

    revertPasswordVisibility (name) {
      const pwd = this.getFormItemByName(name)
      const pwdIdx = this.getFormItemIndexByName(name)
      if (pwd) {
        pwd.type = pwd.type === 'password' ? 'text' : 'password'
        pwd.icons[1].name = pwd.type === 'password' ? 'visibility_off' : 'visibility'
        this.$set(this.form, pwdIdx, pwd)
      }
    },

    onFormInput (data) {
      // const indexOfItem = this.form.findIndex(item => item.name === data.name)
      const indexOfItem = this.getFormItemIndexByName(data.name)
      if (indexOfItem >= 0) {
        const item = Object.assign({}, this.form[indexOfItem], data)
        this.$set(this.form, indexOfItem, item)
      }
    },
    onRegistration () {
      this.$router.push({ name: 'auth-register' })
    },
    onCancel () {
      this.$router.push({ name: 'home' })
    },
    async submit () {
      if (this.$refs.form.validate()) {
        const form = {}
        // eslint-disable-next-line no-return-assign
        this.form.forEach(item => form[item.name] = item.value)

        const authMethod = this[this.type]
        if (authMethod) {
          await authMethod(form)
        }
        // if (this.type === 'signin') {
        //   await this.signin(form)
        // }
        // if (this.type === 'register') {
        //   await this.register(form)
        // }
        console.log('this.isLogged', this.isLogged)
        if (this.isLogged) {
          console.log('TO HOME')
          this.$router.push({ name: 'home' })
        }
      } else {
        this.$q.notify({ message: 'Пожалуйста, заполните все поля.', type: 'warning' })
      }
    }
  }
}
