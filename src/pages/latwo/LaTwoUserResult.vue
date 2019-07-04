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
              <q-tab name="parttwo" label="Устное тестирование" />
              <q-tab name="offer" label="Программа занаятий" />
              <q-tab name="courses" label="Курсы" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>

              <q-tab-panel name="result">
                <user-result-matrix
                  ref="matrix"
                  @set-level-one="onSetLevelOne"
                ></user-result-matrix>
              </q-tab-panel>

              <q-tab-panel name="parttwo">
                <speaking-test
                  :level-one="levelOne"
                  @part-two-result-saved="onSpeakingTestSaved"
                ></speaking-test>
              </q-tab-panel>

              <q-tab-panel name="offer">
                <div class="text-h6">Программа занаятий</div>
                <orders></orders>
              </q-tab-panel>

              <q-tab-panel name="courses">
                <div class="text-h6">Курсы</div>
                <courses></courses>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
  </q-page>
</template>

<script>
import UserResultMatrix from '../../components/la/part-two/UserResultMatrix'
import SpeakingTest from '../../components/la/part-two/SpeakingTest'
import Orders from '../../components/la/part-two/orders/Orders'
import Courses from '../../components/la/part-two/orders/Courses'
export default {
  name: 'LaTwoUserResult',
  components: { Courses, Orders, SpeakingTest, UserResultMatrix },
  data () {
    return {
      tab: 'result',
      levelOne: 0
    }
  },
  methods: {
    onSetLevelOne (val) {
      this.levelOne = val
    },
    async onSpeakingTestSaved () {
      this.tab = 'result'
      await this.$nextTick()
      this.$refs.matrix.refresh()
    }
  }
}
</script>

<style scoped>
</style>
