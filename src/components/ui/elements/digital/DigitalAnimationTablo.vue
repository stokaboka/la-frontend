<template>
  <q-avatar  class="shadow-1" :size="size" :color="color" :text-color="textColor">
    <div class="row justify-center items-center">
      <div class="relative-position digital-area">
        <div class="absolute-top digital-area__mask digital-area__mask-top"></div>
        <div class="relative-position row no-wrap digital-area__digits">
          <digit-vertical-animation v-if="d1 != null" :value-digit="d1" name="d1"></digit-vertical-animation>
          <digit-vertical-animation v-if="d2 != null" :value-digit="d2" name="d2"></digit-vertical-animation>
          <digit-vertical-animation v-if="d3 != null" :value-digit="d3" name="d3"></digit-vertical-animation>
        </div>
        <div class="absolute-bottom digital-area__mask digital-area__mask-bottom"></div>
      </div>
    </div>
  </q-avatar>
</template>

<script>

import DigitVerticalAnimation from './DigitVerticalAnimation'
export default {
  name: 'DigitalAnimationTablo',
  components: { DigitVerticalAnimation },
  props: {
    value: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default () {
        return '6rem'
      },
      required: false
    },
    color: {
      type: String,
      default () {
        return 'black'
      },
      required: false
    },
    textColor: {
      type: String,
      default () {
        return 'white'
      },
      required: false
    }
  },
  data () {
    return {
      d1: null,
      d2: null,
      d3: null
    }
  },
  mounted () {
    this.refresh()
  },
  computed: {
    dd () {
      if (this.value !== null) {
        return this.value.toString()
      }
      return false
    }
  },
  methods: {
    ddX (n) {
      if (this.dd && this.dd.length >= n) {
        const d = this.dd.substr(n - 1, 1)
        return parseInt(d, 10)
      }
      return false
    },
    refresh () {
      if (this.dd) {
        switch (this.dd.length) {
          case 0 :
            this.d3 = null
            this.d2 = null
            this.d1 = 0
            break
          case 1 :
            this.d3 = null
            this.d2 = null
            this.d1 = this.ddX(1)
            break
          case 2 :
            this.d3 = null
            this.d2 = this.ddX(2)
            this.d1 = this.ddX(1)
            break
          case 3 :
            this.d2 = this.ddX(3)
            this.d2 = this.ddX(2)
            this.d1 = this.ddX(1)
            break
        }
      }
    }
  },
  watch: {
    value () {
      this.refresh()
    }
  }
}
</script>

<style scoped>
  .digital-area {
    overflow: hidden;
    height: 3rem;
    line-height: 2rem;
  }

  .digital-area__digits {
    top: 0.5rem;
  }

  .digital-area__mask {
    width: 3ch;
    height: 1vh;
    z-index: 2;
  }

  .digital-area__mask-top {
    background: linear-gradient(to top, transparent, #4caf50);
  }
  .digital-area__mask-bottom {
    background: linear-gradient(to bottom, transparent, #4caf50);
  }
</style>
