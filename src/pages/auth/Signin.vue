<template>
  <div class="q-pa-md column justify-center items-center">
    <q-avatar size="5rem">
      <q-icon name="person_outline" size="5rem" color="secondary"></q-icon>
    </q-avatar>

    <base-form :form="form"
                ref="form"
                @on-form-input="onFormInput"
    ></base-form>

    <div class="row q-mt-md">
      <q-btn @click="onRegistration" color="primary" class="q-mx-md">Регистрация</q-btn>
      <q-btn @click="submit" color="primary" class="q-mx-md" :disabled="false">Логин</q-btn>
      <q-btn @click="onCancel" class="q-mx-md">Отмена</q-btn>
    </div>

  </div>
</template>

<script>

import authMixin from './auth.mixin'
import BaseForm from '../../components/ui/form/BaseForm'

export default {
  name: 'Signin',
  components: { BaseForm },
  mixins: [ authMixin ],
  mounted () {
    this.$q.notify({
      message: 'Для входа введите имя пользователя и пароль',
      color: 'accent',
      textColor: 'white'
    })
  },
  data () {
    return {
      type: 'signin',
      form: [
        {
          name: 'login',
          label: 'Имя пользователя',
          value: '111',
          type: 'text',
          autofocus: true,
          validations: [
            val => !!val || 'Имя пользователя должно быть заполнено',
            val => (val && val.length > 1) || `Имя пользователя не менее 1 символа`,
            val => (val && val.length < 50) || `Имя пользователя не более 50 символов`
          ],
          icons: [
            {
              name: 'person_outline',
              slot: 'before'
            }
          ]

        },
        {
          name: 'password',
          label: 'Пароль',
          value: '111111',
          type: 'password',
          autofocus: false,
          validations: [
            val => !!val || 'Пароль должен быть заполнен',
            val => (val && val.length >= 6) || `Пароль не менее 6 символов`,
            val => (val && val.length < 15) || `Пароль не более 15 символов`
          ],
          icons: [
            {
              name: 'vpn_key',
              slot: 'before'
            },
            {
              name: 'visibility_off',
              slot: 'append',
              action: () => this.revertPasswordVisibility('password')
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
</style>
