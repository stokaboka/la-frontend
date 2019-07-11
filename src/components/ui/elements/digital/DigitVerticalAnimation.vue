<template>
  <div class="relative-position digit-vertical-anim">

    <transition
      enter-active-class="animated slideInDownDigit"
      leave-active-class="animated slideOutDownDigit"
      mode="out-in"
    >
      <div v-bind:key="valueDigit" class="digit-vertical-anim__symbol">
        {{valueDigit}}
      </div>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'DigitVerticalAnimation',
  props: {
    valueDigit: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default () {
        return '?'
      },
      required: false
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .digit-vertical-anim {
  }

  .digit-vertical-anim__symbol {
    text-shadow: 0 3px 3px #666666;
  }

  @-webkit-keyframes slideInDownDigit {
    from {
      -webkit-transform: translate3d(0, -150%, 0);
      transform: translate3d(0, -150%, 0);
      visibility: visible;
    }

    80% {
      -webkit-transform: translate3d(0, 10%, 0);
      transform: translate3d(0, 20%, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInDownDigit {
    from {
      -webkit-transform: translate3d(0, -150%, 0);
      transform: translate3d(0, -150%, 0);
      visibility: visible;
    }

    80% {
      -webkit-transform: translate3d(0, 20%, 0);
      transform: translate3d(0, 20%, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInDownDigit {
    -webkit-animation-name: slideInDownDigit;
    animation-name: slideInDownDigit;
    animation-duration: 200ms;
    animation-timing-function: ease-out;
  }

  @-webkit-keyframes slideOutDownDigit {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(0, 150%, 0);
      transform: translate3d(0, 150%, 0);
    }
  }

  @keyframes slideOutDownDigit {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(0, 150%, 0);
      transform: translate3d(0, 150%, 0);
    }
  }

  .slideOutDownDigit {
    -webkit-animation-name: slideOutDownDigit;
    animation-name: slideOutDownDigit;
    animation-duration: 200ms;
    animation-timing-function: linear;
  }
</style>
