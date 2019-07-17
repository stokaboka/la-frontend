<template>

  <q-card>

    <q-card-section class="column justify-center items-center auth-title__background">
      <q-avatar size="5rem">
        <q-icon name="person_add" size="4rem" color="white" class="auth-title__title-icon"></q-icon>
      </q-avatar>
    </q-card-section>

    <q-card-section>
      <base-form :form="form"
                 ref="form"
                 @on-form-input="onFormInput"
      ></base-form>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn @click="submit" color="primary" class="q-mx-md">Регистрация</q-btn>
      <q-btn @click="onCancel" class="q-mx-md">Отмена</q-btn>
    </q-card-actions>

  </q-card>

</template>

<script>

/*
  <div class="q-pa-md column justify-center items-center">
    <q-icon name="person_outline" size="5rem" color="secondary"></q-icon>

    <base-form :form="form"
               ref="form"
               @on-form-input="onFormInput"
    ></base-form>

    <div class="row q-mt-md">
      <q-btn @click="submit" color="primary" class="q-mx-md">Регистрация</q-btn>
      <q-btn @click="onCancel" class="q-mx-md">Отмена</q-btn>
    </div>

  </div>
 */

import authMixin from './auth.mixin'
import BaseForm from '../../components/ui/form/BaseForm'
import { date } from 'quasar'

export default {
  name: 'Register',
  components: { BaseForm },
  mixins: [ authMixin ],
  mounted () {
    this.$q.notify({
      message: 'Для регистрации введите имя пользователя и пароль, а так-же Ваше имя, отчество, фамилию',
      color: 'accent',
      textColor: 'white'
    })
  },
  data () {
    return {
      type: 'register',
      form: [
        {
          name: 'login',
          label: 'Имя пользователя',
          value: '',
          type: 'text',
          autofocus: true,
          validations: [
            val => !!val || 'Имя пользователя должно быть заполнено',
            val => (val && val.length >= 3) || `Имя пользователя не менее 3 символов`,
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
          value: '',
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
        },
        {
          name: 'repeatPassword',
          label: 'Повтор пароля',
          value: '',
          type: 'password',
          autofocus: false,
          validations: [
            val => !!val || 'Повтор пароля должен быть заполнен',
            val => (val && val.length >= 6) || `Повтор пароля не менее 6 символов`,
            val => (val && val.length < 15) || `Повтор пароля не более 15 символов`,
            val => (val && val === this.getFormItemByName('password').value) || `Пароль и подтверждение пароля не совпадают`
          ],
          icons: [
            {
              name: 'vpn_key',
              slot: 'before'
            },
            {
              name: 'visibility_off',
              slot: 'append',
              action: () => this.revertPasswordVisibility('repeatPassword')
            }
          ]
        },

        {
          name: 'firstName',
          label: 'Имя',
          value: '',
          type: 'text',
          autofocus: false,
          validations: [
            val => !!val || 'Имя должно быть заполнено',
            val => (val && val.length >= 1) || `Имя не менее 1 символа`,
            val => (val && val.length < 50) || `Имя не более 50 символов`
          ],
          icons: [
            {
              name: 'edit',
              slot: 'before'
            }
          ]
        },
        {
          name: 'secondName',
          label: 'Отчество',
          value: '',
          type: 'text',
          autofocus: false,
          validations: [
            val => !!val || 'Отчество должно быть заполнено',
            val => (val && val.length >= 1) || `Отчество не менее 1 символа`,
            val => (val && val.length < 50) || `Отчество не более 50 символов`
          ],
          icons: [
            {
              name: 'edit',
              slot: 'before'
            }
          ]
        },
        {
          name: 'lastName',
          label: 'Фамилия пользователя',
          value: '',
          type: 'text',
          autofocus: false,
          validations: [
            val => !!val || 'Фамилия должно быть заполнено',
            val => (val && val.length >= 1) || `Фамилия не менее 1 символа`,
            val => (val && val.length < 50) || `Фамилия не более 50 символов`
          ],
          icons: [
            {
              name: 'edit',
              slot: 'before'
            }
          ]
        },
        {
          name: 'birthday',
          label: 'Дата рождения',
          value: '',
          type: 'text',
          mask: '##.##.####',
          autofocus: false,
          validations: [
            val => {
              if (val) {
                return (date.isValid(val)) || 'Неверный формат даты рождения'
              }
              return true
            }
          ],
          icons: [
            {
              name: 'date_range',
              slot: 'before'
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
    background: radial-gradient(circle, #21ba45 0%, #247a42 100%)
  }
</style>
