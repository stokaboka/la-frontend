<template>
  <div
    :class="[
              { column: orientation === 'V' },
              { row: orientation === 'H' }
            ]"
  >
    <q-item
      v-for="a in data"
      :key="a.label"
      tag="label"
      v-ripple
      class="q-pa-none q-ml-md"
    >
      <q-item-section avatar class="q-pr-none">
        <q-radio v-model="answer" :val="a.value" @input="onInput" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-body1">{{ a.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'RadioButtonsGroup',
  data () {
    return {
      answer: null
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    orientation: {
      type: String,
      required: false,
      default () {
        return 'V'
      }
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
</style>
