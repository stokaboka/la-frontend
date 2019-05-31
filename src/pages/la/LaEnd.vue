<template>
  <q-page class="container">
    <div class="column la-main q-pa-lg shadow-3">
    <div class="q-pa-lg">
      <q-banner rounded class="bg-orange-10 text-white shadow-3">
        <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
        <div class="q-pl-lg text-h5">
          <p>Тестирование успешно пройдено.</p>
          <p>Ваш менеджер свяжется с вами в течение суток</p>
        </div>
      </q-banner>
    </div>
    </div>
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
