<template>
  <q-card>
    <q-card-section class="row q-gutter-md q-my-md q-bg-white">
      <q-select v-model="test.value" :options="test.options" :label="test.label" emit-value map-options stack-label @input="onInput" />
      <q-select v-model="part.value" :options="part.options" :label="part.label" emit-value map-options stack-label  @input="onInput"/>
      <q-select v-model="phase.value" :options="phaseOptions" :label="phase.label" emit-value map-options stack-label  @input="onInput"/>
    </q-card-section>
    <q-card-section>
    <editor
      module="questions"
      :filter="params"
      :selection="selection"
      :selected-row="questionEditor"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onTableRowClick"
    ></editor>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Editor from '../../../ui/table/Editor'
import { partTwoCategories } from '../constants'

export default {
  name: 'Questions',
  components: { Editor },
  data () {
    return {
      params: '',
      selection: 'single',
      test: {
        label: 'Тесты',
        value: 1,
        options: [
          {
            label: 'Тест № 1',
            value: 1
          }
        ]
      },
      part: {
        label: 'Часть теста',
        value: 1,
        options: [
          {
            label: 'Самостоятельная',
            value: 1
          },
          {
            label: 'Устная',
            value: 2
          }
        ]
      },
      phase: {
        label: 'Проверяемый навык',
        value: 1
      }
    }
  },
  computed: {
    phaseOptions () {
      if (this.part.value === 1) {
        return this.modules.map(e => {
          const label = this.header.modules[e.id].description
          return {
            label,
            value: e.phase
          }
        }, this)
      }
      if (this.part.value === 2) {
        return partTwoCategories.map((e, i) => {
          return {
            label: e,
            value: i + 1
          }
        })
      }
      return []
    },
    ...mapGetters('questions', ['questionEditor']),
    ...mapGetters('app', ['modules']),
    ...mapGetters('text', ['header'])
  },
  mounted () {
    this.params = this.getFilterParams()
  },
  methods: {
    onInput () {
      if (this.phase.value > this.phaseOptions.length) {
        this.phase.value = 1
      }
      this.params = this.getFilterParams()
    },
    getFilterParams () {
      const { test, part, phase } = this
      return `/test/${test.value}/part/${part.value}/phase/${phase.value}`
    },
    onTableRowClick (row) {
      this.SET_QUESTION_EDITOR(row)
    },
    ...mapMutations('questions', ['SET_QUESTION_EDITOR'])
  }
}
</script>

<style></style>
