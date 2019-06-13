<template>
  <q-page padding>
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="result" label="Результат" />
              <q-tab name="parttwo" label="Тестирование - устная часть" />
              <q-tab name="offer" label="Программа занаятий" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>

              <q-tab-panel name="result">
                <user-result-matrix></user-result-matrix>
              </q-tab-panel>

              <q-tab-panel name="parttwo">
                <div class="text-h6">Тестирование - устная часть</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="offer">
                <div class="text-h6">Программа занаятий</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
  </q-page>
</template>

<script>
import UserResultMatrix from '../../components/la/UserResultMatrix'
export default {
  name: 'LaTwoUserResult',
  components: { UserResultMatrix },
  data () {
    return {
      tab: 'result'
    }
  }
}
</script>

<style scoped>
</style>
