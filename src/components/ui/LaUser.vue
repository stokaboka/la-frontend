<template>
  <div class="q-ma-lg">
    <div v-if="user">
      <div class="q-pa-md text-h6 bg-secondary text-white">
        Пользователь
      </div>
      <div class="row justify-start items-start">
          <div v-for="column in columns" :key="column.field">
            <div
              v-if="user[column.field]"
              class="column items-start q-pa-sm text-grey-14"
            >
              <span class="q-mr-md text-subtitle2">{{ column.label }}</span>
              <div v-if="column.gadget">
                <q-chip
                  v-if="column.gadget.type === 'chip'"
                  v-bind="column.gadget.options[user[column.field]]"
                  class="shadow-2"
                ></q-chip>
                <q-toggle
                  v-if="column.gadget.type === 'toggle'"
                  v-model="user[column.field]"
                  v-bind="column.gadget.options"
                ></q-toggle>
              </div>
              <div v-else class="text-weight-medium">
                {{ user[column.field] }}
              </div>
            </div>
          </div>
      </div>

      <div class="q-mb-md row q-gutter-md">
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
      </div>

      <q-separator />

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LaUser',
  data () {
    return {
      attempt: null
    }
  },
  computed: {
    columns () {
      return this.model.columns.filter(e => e.visible)
    },
    ...mapGetters('users', ['user', 'model'])
  },
  methods: {
    onTableRowClick (row) {},
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
