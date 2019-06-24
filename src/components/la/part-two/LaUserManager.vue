<template>
  <div class="row q-gutter-md no-wrap">
    <row-form
      :data="user"
      title="Пользователь"
      :model="usersModel"
      :visible-columns="userVisibleColumns"
    >
      <template v-slot:actions>
        <div v-if="isUsersPage && user" class="row q-gutter-md">
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
      <template v-slot:message>
        <q-banner v-if="!user" rounded class="text-grey-10 bg-warning">
        Для продолжения нужно выбрать пользователя.<br>Найдите и выберите запись в таблице <strong><q>Пользователи</q></strong></q-banner>
      </template>
    </row-form>
    <row-form :data="attempt" title="Попытка" :model="attemptModel">
      <template v-slot:actions>
        <q-btn
          v-if="isUsersPage && attempt"
          color="green"
          label="Результат"
          @click="$router.push({ name: 'part-two-user-results' })"
        >
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Перейти к результатам теста
          </q-tooltip>
        </q-btn>
      </template>
      <template v-slot:message>
        <q-banner v-if="!attempt" rounded class="text-grey-10 bg-warning">
          Для продолжения нужно выбрать попытку.<br>Найдите и выберите запись в таблице <strong><q>Попытки прохождения теста</q></strong>
        </q-banner>
      </template>
    </row-form>
    <row-form
      v-if="authUser"
      :data="authUser"
      title="Инструктор"
      :model="usersModel"
      :visible-columns="managerVisibleColumns"
    >
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
      userVisibleColumns: [
        'login',
        'firstName',
        'secondName',
        'lastName',
        'closed',
        'birthday',
        'attempt'
      ],
      managerVisibleColumns: ['login', 'firstName', 'secondName', 'lastName']
    }
  },
  computed: {
    isUsersPage () {
      return this.$route.name === 'part-two-users'
    },
    ...mapGetters('users', {
      user: 'user',
      authUser: 'authUser',
      usersModel: 'model'
    }),
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

<style></style>
