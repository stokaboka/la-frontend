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
  </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  }
}
</script>

<style></style>
