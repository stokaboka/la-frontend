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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
  </q-page>
</template>

<script>
import UserResultMatrix from '../../components/la/part-two/UserResultMatrix'
import SpeakingTest from '../../components/la/part-two/SpeakingTest'
export default {
  name: 'LaTwoUserResult',
  components: { SpeakingTest, UserResultMatrix },
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
