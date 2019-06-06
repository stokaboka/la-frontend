<template>
        <q-page class="q-pa-md">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
        </q-page>
</template>

<script>
export default {
  name: 'PhaseTwo',
  data () {
    return {
      drawer: true,
      miniState: true
    }
  },

  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mini-slot
    transition background-color .28s
    &:hover
      background-color rgba(0, 0, 0, .04)

  .mini-icon
    font-size 1.718em

    & + &
      margin-top 18px
</style>
