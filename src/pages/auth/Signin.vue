<template>

  <q-card>

    <q-card-section class="column justify-center items-center auth-title__background">
      <q-avatar size="5rem">
        <q-icon name="person" size="5rem" color="white" class="auth-title__title-icon"></q-icon>
      </q-avatar>
    </q-card-section>

    <q-card-section>
      <q-form
        @submit="submit"
        @reset="onReset">
        <base-form :form="form"
                   ref="form"
                   @on-form-input="onFormInput"
                   @on-form-submit="submit"
        ></base-form>
      </q-form>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn @click="onRegistration" color="secondary" class="q-mx-md" :label="auth.buttons.register.label"></q-btn>
      <q-btn @click="submit" color="primary" class="q-mx-md" :disabled="false" :label="auth.buttons.signIn.label"></q-btn>
      <q-btn @click="onCancel" class="q-mx-md" :label="auth.buttons.cancel.label"></q-btn>
    </q-card-actions>

  </q-card>

</template>

<script>

import authMixin from './auth.mixin'
import BaseForm from '../../components/ui/form/BaseForm'

export default {
  name: 'Signin',
  components: { BaseForm },
  mixins: [ authMixin ],
  mounted () {
    this.initForm()
    this.$q.notify({
      message: this.auth.message.signin,
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
          // label: 'Имя пользователя',
          value: '',
          type: 'text',
          autofocus: true,
          // validations: [
          //   val => !!val || 'Имя пользователя должно быть заполнено',
          //   val => (val && val.length >= 3) || `Имя пользователя не менее 3 символов`,
          //   val => (val && val.length < 50) || `Имя пользователя не более 50 символов`
          // ],
          icons: [
            {
              name: 'person_outline',
              slot: 'before'
            }
          ]

        },
        {
          name: 'password',
          // label: 'Пароль',
          value: '',
          type: 'password',
          autofocus: false,
          // validations: [
          //   val => !!val || 'Пароль должен быть заполнен',
          //   val => (val && val.length >= 6) || `Пароль не менее 6 символов`,
          //   val => (val && val.length < 15) || `Пароль не более 15 символов`
          // ],
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

<style scoped>
  .auth-title__title-icon {
    text-shadow: 3px 3px 3px #666666;
  }

  .auth-title__background {
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)
  }
</style>
