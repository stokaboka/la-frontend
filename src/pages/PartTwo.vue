<template>
  <q-page class="q-pt-lg row justify-center items-start">
    <div class="wrapper">
      <la-about/>

      <q-video
        src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
      />

      <div class="q=mt-lg column justify-start items-start">
        <q-btn
          label="Продолжить"
          color="primary"
          class="q-ma-md"
          @click="$router.push({ name: 'part-two-users' })"
        />
      </div>

    </div>
  </q-page>
</template>

<script>

/*
<div class="text-body1 text-grey-14">
          Порядок работы с клиентом:
          <ol>
            <li>Выбрать пользователя в разделе <q>Пользователи</q>
              <ul>
                <li>если успешно пройдена <q>Часть 1</q>
                  <ol>
                    <li>пройти <q>Часть 2</q></li>
                    <li>проанализировать результаты тестирования</li>
                    <li>оформить учебную программу</li>
                  </ol>
                </li>
              </ul>
              <ul>
                <li><q>Часть 1</q> не пройдена или требуется повторное тестирование
                  <ol>
                    <li>разрешить пройти <q>Часть 1</q> еще раз</li>
                  </ol>
                </li>
              </ul>
            </li>
          </ol>
        </div>
 */

import LaAbout from '../components/LaAbout'
export default {
  name: 'PhaseTwo',
  components: { LaAbout },
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

<style scoped>
</style>
