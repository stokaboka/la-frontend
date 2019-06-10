<template>
  <div class="q-ma-lg">
    <q-card v-if="user">
      <q-card-section class="text-h6 bg-secondary text-white">
        Пользователь
      </q-card-section>
      <q-card-section class="row">
        <div v-for="col in columns" :key="col.field">
          <div v-if="user[col.field]" class="row q-pa-sm text-grey-14">
            <span class="q-mr-md">{{ col.label }}</span>
            <span class="text-weight-medium">{{ user[col.field] }}</span>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          :disable="user.closed === 0"
          color="primary"
          label="Новая попытка"
          @click="addNewAttempt"
        >
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Разрешить пользователю еще раз пройти фазу 1 теста
          </q-tooltip>
        </q-btn>

        <q-btn
          :disable="user.closed === 1"
          color="primary"
          label="Заблокировать"
          @click="closeAttempt"
        >
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Запретить пользователю проходить фазу 1 теста
          </q-tooltip>
        </q-btn>

        <q-btn>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LaUser',
  data () {
    return {}
  },
  computed: {
    columns () {
      return this.model.columns.filter(e => e.visible)
    },
    ...mapGetters('users', ['user', 'model'])
  },
  methods: {
    async addNewAttempt () {
      await this.newAttempt(this.user)
      await this.reload('users')
    },
    async closeAttempt () {
      await this.fixAttempt(this.user)
      await this.reload('users')
    },
    ...mapActions('users', ['newAttempt', 'fixAttempt']),
    ...mapActions('editor', ['reload'])
  }
}
</script>

<style></style>
