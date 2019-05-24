<template>
  <component
    :is="component"
    :data="data"
    @on-answer="onAnswer"
    v-if="component"
  />
</template>

<script>
export default {
  name: 'DynamicLaComponent',
  props: ['data', 'type'],
  data () {
    return {
      component: null
    }
  },
  methods: {
    onAnswer (answer) {
      this.$emit('on-answer', answer)
    },
    loader () {
      if (!this.type) {
        return null
      }
      return () => import(`./components/la/${this.type}`)
    }
  },
  computed: {
  },
  mounted () {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(() => {
        this.component = () => import('./components/DefaultLaComponent')
      })
  }
}
</script>

<style></style>
