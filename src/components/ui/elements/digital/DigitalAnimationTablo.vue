<template>
  <q-avatar :size="size" :color="color" :text-color="textColor">
    <div class="row justify-center items-center">
      <div class="relative-position digital-area">
        <div class="absolute-top digital-area__mask digital-area__mask-top"></div>
        <div class="relative-position row no-wrap digital-area__digits">
           <digit-vertical-animation v-if="d1" :value-digit="d1.newVal" name="d1"></digit-vertical-animation>
           <digit-vertical-animation v-if="d2" :value-digit="d2.newVal" name="d2"></digit-vertical-animation>
           <digit-vertical-animation v-if="d3" :value-digit="d3.newVal" name="d3"></digit-vertical-animation>
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
    this.refresh(0, '')
  },
  methods: {
    refresh (newVal) {
      const digits = newVal
        .toString()
        .split('')
        .map(e => parseInt(e, 10))
        .reverse()
        .map((newVal) => {
          return { newVal }
        })
        .reverse()

      switch (digits.length) {
        case 0 :
          this.d3 = null
          this.d2 = null
          this.d1 = { newVal: 0 }
          break
        case 1 :
          this.d3 = null
          this.d2 = null
          this.d1 = digits[0]
          break
        case 2 :
          this.d3 = null
          this.d2 = digits[1]
          this.d1 = digits[0]
          break
        case 3 :
          this.d3 = digits[2]
          this.d2 = digits[1]
          this.d1 = digits[0]
          break
      }
    }
  },
  watch: {
    value (newVal) {
      this.refresh(newVal)
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
    height: 1.25vh;
    z-index: 2;
  }

  .digital-area__mask-top {
    background: linear-gradient(to top, transparent, #4caf50);
  }
  .digital-area__mask-bottom {
    background: linear-gradient(to bottom, transparent, #4caf50);
  }
</style>
