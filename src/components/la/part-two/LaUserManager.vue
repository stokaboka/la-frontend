<template>
    <div class="row q-gutter-md no-wrap">
      <la-user v-if="user" :user="user" title="Пользователь" :model="model" :visible-columns="userVisibleColumns">
        <template v-slot:actions>
          <div class="row q-gutter-md">
            <q-btn
              :disable="user.closed === 0"
              color="primary"
              label="Новая попытка"
              @click="addNewAttempt"
            >
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Разрешить пользователю еще раз пройти самостоятельное тестирование
              </q-tooltip>
            </q-btn>

            <q-btn
              :disable="user.closed === 1"
              color="primary"
              label="Заблокировать"
              @click="closeAttempt"
            >
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Запретить пользователю проходить самостоятельное тестирование
              </q-tooltip>
            </q-btn>

            <q-btn
              color="primary"
              label="Результат"
              @click="closeAttempt"
            >
              <q-tooltip transition-show="flip-right" transition-hide="flip-left">
                Перейти к результатам теста
              </q-tooltip>
            </q-btn>

          </div>
        </template>
      </la-user>
      <la-user v-if="authUser" :user="authUser" title="Инструктор" :model="model" :visible-columns="managerVisibleColumns">
      </la-user>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LaUser from './LaUser'
export default {
  name: 'LaUserManager',
  components: {
    LaUser
  },
  data () {
    return {
      userVisibleColumns: ['login', 'firstName', 'secondName', 'lastName', 'closed', 'birthday', 'attempt'],
      managerVisibleColumns: ['login', 'firstName', 'secondName', 'lastName']
    }
  },
  computed: {
    ...mapGetters('users', ['user', 'authUser', 'model'])
  },
  methods: {
    onUsersTableRowClick (row) {},
    async addNewAttempt () {
      await this.newAttempt(this.user)
      await this.reload({ module: 'users' })
    },
    async closeAttempt () {
      await this.fixAttempt(this.user)
      await this.reload({ module: 'users' })
    },
    ...mapActions('users', ['newAttempt', 'fixAttempt']),
    ...mapActions('editor', ['load', 'reload'])
  }
}
</script>

<style>
</style>
