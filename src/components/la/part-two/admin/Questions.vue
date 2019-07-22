<template>
  <div>
    <div class="row q-gutter-md q-my-md">
      <q-select v-model="test.value" :options="test.options" :label="test.label" emit-value map-options stack-label @input="onInput" />
      <q-select v-model="part.value" :options="part.options" :label="part.label" emit-value map-options stack-label  @input="onInput"/>
      <q-select v-model="phase.value" :options="phase.options" :label="phase.label" emit-value map-options stack-label  @input="onInput"/>
    </div>
    <editor
      module="questions"
      :filter="params"
      :selection="selection"
      :selected-row="questionEditor"
      hide-columns-selector
      hide-grid-selector
      @table-row-click="onTableRowClick"
    ></editor>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Editor from '../../../ui/table/Editor'
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
        value: 1,
        options: []
      }
    }
  },
  computed: {
    ...mapGetters('questions', ['questionEditor']),
    ...mapGetters('app', ['modules'])
  },
  mounted () {
    this.phase.options = this.modules.map(e => {
      return {
        label: e.description,
        value: e.phase
      }
    })

    this.params = this.getFilterParams()
  },
  methods: {
    onInput () {
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
