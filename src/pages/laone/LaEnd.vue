<template>
  <q-page class="column justify-center items-center">

        <q-banner rounded class="banner__background text-white shadow-3">
          <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
          <div class="q-pl-lg text-h5">
            <p>Тестирование успешно пройдено.</p>
            <p>Ваш менеджер свяжется с вами в течение суток</p>
          </div>
        </q-banner>

  </q-page>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'LaEnd',
  mixins: [mixin],

  mounted () {
    this.SET_LEFT_DRAWER(false)
    this.SET_RIGHT_DRAWER(false)
    this.SET_SHOW_NEXT(false)
    this.CLEAR_QUESTIONS()
  }
}
</script>

<style scoped>

  .banner__background {
    background: radial-gradient(circle, #1f9c40 0%, #247a42 100%)
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: "counter main timer";
  }

  @media (max-width: 762px) {
    .container {
      display: grid;
      grid-auto-rows: min-content;
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      grid-template-areas:
        "main main"
        "counter timer";
    }
  }

  .la-main {
    grid-area: main;
    background-color: white;
  }

</style>
