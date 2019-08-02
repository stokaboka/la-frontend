<template>
  <div class="column justify-center items-center">
    <span>{{info.right.soundLevel}}</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('text', ['info'])
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
