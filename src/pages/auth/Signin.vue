<template>
  <div class="q-pa-md column justify-center items-center">
    <q-icon name="person_outline" size="5rem" color="secondary" class="auth-login-icon"></q-icon>
    <span class="auth-login-subtitle">Для входа введите имя пользователя и пароль</span>

    <div class="q-gutter-md q-pa-lg column justify-center items-start" style="max-width: 500px">
        <q-input
          v-model="form.login"
          clearable
          counter
          outlined
          name="login"
          ref="login"
          :rules="validations.form.login"
          lazy-rules
          @keyup.enter="submit"
          label="Имя пользователя">
          <template v-slot:before>
            <q-icon name="person_outline"></q-icon>
          </template>
        </q-input>

        <q-input
          v-model="form.password"
          clearable
          counter
          outlined
          name="password"
          ref="password"
          :rules="validations.form.password"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          @keyup.enter="submit"
          label="Пароль">
          <template v-slot:before>
            <q-icon name="vpn_key"></q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"></q-icon>
          </template>
        </q-input>

    </div>

    <div class="auth-login-buttons">
      <q-btn @click="onRegistration" color="primary" class=" auth-btn_reg">Регистрация</q-btn>
      <q-btn @click="submit" color="primary" class=" submit auth-btn" :disabled="false">Логин</q-btn>
      <q-btn @click="onCancel" class="auth-btn">Отмена</q-btn>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Signin',
  data () {
    return {
      text: '',
      isPwd: true,
      form: {
        login: '',
        password: ''
      },
      validations: {
        form: {
          login: [
            val => !!val || 'Имя пользователя должно быть заполнено',
            val => (val && val.length > 1) || `Имя пользователя не менее 1 символа`,
            val => (val && val.length < 50) || `Имя пользователя не более 50 символов`
          ],
          password: [
            val => !!val || 'Пароль должен быть заполнен',
            val => (val && val.length >= 6) || `Пароль не менее 6 символов`,
            val => (val && val.length < 15) || `Пароль не более 15 символов`
          ]
        }
      }
    }
  },

  computed: {
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('app', ['api'])
  },

  methods: {
    onRegistration () {
      this.$router.push({ name: 'auth-register' })
    },
    onCancel () {
      this.$router.push({ name: 'home' })
    },
    async submit () {
      this.$refs.login.validate()
      this.$refs.password.validate()

      if (this.$refs.login.hasError || this.$refs.password.hasError) {
        this.$q.notify({ message: 'Пожалуйста, заполните все поля.', type: 'warning' })
        return
      }

      const { login, password } = this.form
      await this.signin({ login, password })

      if (this.isLogged) {
        this.$router.push({ name: 'home' })
      }
    },
    ...mapActions('auth', ['signin'])
  }
}
</script>

<style scoped>
  .auth-input {
    margin-bottom: 2rem;
  }

  .auth-btn {
    margin-left: 1rem;
  }

  .auth-login-icon {
  }

  .auth-login-container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;

    height: 100%;

    padding: 2rem;
  }

  .auth-login-buttons {
    display: flex;
    justify-content: flex-end;

    margin: 1rem;
  }

  .auth-login-subtitle {
    text-align: center;
  }
</style>
