<template>
    <div class="row q-gutter-md no-wrap">
      <row-form v-if="user" :data="user" title="Пользователь" :model="usersModel" :visible-columns="userVisibleColumns">
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

          </div>
        </template>
      </row-form>
      <row-form v-if="attempt" :data="attempt" title="Попытка" :model="attemptModel">
        <template v-slot:actions>
          <q-btn
            color="green"
            label="Результат"
            @click="$router.push({ name: 'part-two-user-results' })"
          >
            <q-tooltip transition-show="flip-right" transition-hide="flip-left">
              Перейти к результатам теста
            </q-tooltip>
          </q-btn>
        </template>
      </row-form>
      <row-form v-if="authUser" :data="authUser" title="Инструктор" :model="usersModel" :visible-columns="managerVisibleColumns">
      </row-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RowForm from '../../ui/table/RowForm'
export default {
  name: 'LaUserManager',
  components: {
    RowForm
  },
  data () {
    return {
      userVisibleColumns: ['login', 'firstName', 'secondName', 'lastName', 'closed', 'birthday', 'attempt'],
      managerVisibleColumns: ['login', 'firstName', 'secondName', 'lastName']
    }
  },
  computed: {
    ...mapGetters('users', { user: 'user', authUser: 'authUser', usersModel: 'model' }),
    ...mapGetters('attempts', { attempt: 'attempt', attemptModel: 'model' })
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
