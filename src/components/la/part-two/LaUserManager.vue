<template>
  <div class="row q-gutter-md no-wrap">
    <row-form
      :row="user"
      title="Пользователь"
      :model="usersModel"
      :visible-columns="userVisibleColumns"
      :show-actions="showUserActions"
      :show-messages="showUserMessages"
    >
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
      <template v-slot:message>
        <q-banner rounded class="text-grey-10 bg-warning">
        Для продолжения нужно выбрать пользователя.<br>Найдите и выберите запись в таблице <strong><q>Пользователи</q></strong></q-banner>
      </template>
    </row-form>
    <row-form
      :row="attempt"
      title="Попытка"
      :model="attemptModel"
      :show-actions="showAttemptActions"
      :show-messages="showAttemptMessages"
    >
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
      <template v-slot:message>
        <q-banner rounded class="text-grey-10 bg-warning">
          Для продолжения нужно выбрать попытку.<br>Найдите и выберите запись в таблице <strong><q>Попытки прохождения теста</q></strong>
        </q-banner>
      </template>
    </row-form>
    <row-form
      v-if="user && attempt"
      :row="level"
      title="Уровень"
      :model="levelModel"
      :show-actions="false"
      :show-messages="false"
    >
    </row-form>
    <row-form
      v-if="authUser"
      :row="authUser"
      title="Инструктор"
      :model="usersModel"
      :visible-columns="managerVisibleColumns"
      :show-actions="authUserControls"
      :show-messages="authUserControls"
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
      authUserControls: false,

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
    showUserActions () {
      return this.isUsersPage && this.user !== null
    },
    showUserMessages () {
      return this.user === null
    },
    showAttemptActions () {
      return this.isUsersPage && this.attempt !== null
    },
    showAttemptMessages () {
      return this.attempt === null
    },
    isUsersPage () {
      return this.$route.name === 'part-two-users'
    },
    ...mapGetters('users', {
      user: 'user',
      authUser: 'authUser',
      usersModel: 'model'
    }),
    ...mapGetters('attempts', { attempt: 'attempt', attemptModel: 'model' }),
    ...mapGetters('levels', { level: 'level', levelModel: 'model' })
  },
  methods: {
    async addNewAttempt () {
      await this.newAttempt(this.user)
      await this.reload({ module: 'users' })
    },
    async closeAttempt () {
      await this.fixAttempt(this.user)
      await this.reload({ module: 'users' })
    },
    ...mapActions('users', ['newAttempt', 'fixAttempt']),
    ...mapActions('editor', ['load', 'reload']),
    ...mapActions('levels', { loadLevels: 'load' })
  },
  watch: {
    async attempt () {
      const { id: user } = this.user
      const { test, attempt } = this.attempt
      const params = { user, test, attempt }
      await this.loadLevels(params)
    }
  }
}
</script>

<style></style>
