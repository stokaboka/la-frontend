<template>
  <div class="row">
    <q-item >
      <q-item-section side class="cursor-pointer" @click="setVolume(0)">
        <q-icon name="volume_down"/>
      </q-item-section>
      <q-item-section>
        <q-slider
          class="sound-slider"
          v-model="value"
          :min="0"
          :max="100"
          label
          @input="$emit('input', value / 100)"
        />
      </q-item-section>
      <q-item-section side class="cursor-pointer" @click="setVolume(100)">
        <q-icon name="volume_up" />
      </q-item-section>
    </q-item>

  </div>
</template>

<script>
export default {
  name: 'SoundLevel',
  props: {
    volume: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      value: 0
    }
  },
  mounted () {
    this.value = Math.round(this.volume * 100)
  },
  methods: {
    setVolume (val) {
      this.value = val
      this.$emit('input', val / 100)
    }
  }
}
</script>

<style scoped>
  .sound-slider {
    width: 100px;
  }
</style>
