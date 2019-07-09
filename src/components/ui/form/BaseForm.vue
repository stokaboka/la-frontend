<template>
  <div class="q-gutter-md q-pa-lg column justify-center items-start" style="max-width: 500px">

    <q-input v-for="item in form" :key="item.name"
             v-model="item.value"
             clearable
             counter
             outlined
             square
             :name="item.name"
             :type="item.type"
             :mask="item.mask"
             :ref="item.name"
             :rules="item.validations"
             :autofocus="item.autofocus"
             lazy-rules
             @keyup.enter="submit"
             @input="value => onFormInput( item.name, value )"
             :label="item.label">
      <template v-for="icon in item.icons" v-slot:[icon.slot]>
        <q-icon :name="icon.name"
                :key="icon.name"
                :class="{'cursor-pointer': icon.action}"
                @click="icon.action ? icon.action() : ''"
        ></q-icon>
      </template>
    </q-input>

  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    form: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    onFormInput (name, value) {
      this.$emit('on-form-input', { name, value })
    },
    validate () {
      this.form.forEach(item => this.$refs[item.name][0].validate(), this)
      return !this.hasError()
    },
    hasError () {
      return this.form.find(item => this.$refs[item.name][0].hasError, this)
    }
  }
}
</script>

<style>
</style>
