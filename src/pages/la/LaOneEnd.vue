<template>
  <q-page padding>
    <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
    <div class="q-pl-lg text-body1">
      <p>Первая часть теста успешо пройдена.</p>
      <p>Сейчас, Вы можете:</p>
    </div>

    <div class="row q-ma-md">
      <q-btn
        label="Продолжить тестирование"
        color="primary"
        class="q-ma-md"
        @click="$router.push({ name: 'la-two' })"
      />

      <q-btn
        label="Прерваться и продолжить позже"
        color="secondary"
        class="q-ma-md"
        @click="$router.push({ name: 'home' })"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LaOneEnd',
  mounted () {
    this.SET_LEFT_DRAWER(true)
    this.SET_RIGHT_DRAWER(true)
  }
}
</script>

<style></style>
