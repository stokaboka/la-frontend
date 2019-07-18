<template>
  <q-page class="q-pa-lg column justify-center items-center q-gutter-md">

      <la-about class="part-two__about"/>

        <q-btn
          label="Продолжить"
          color="primary"
          class="q-ma-md"
          @click="$router.push({ name: 'part-two-users' })"
        />

    <p>Обучающие видео для первого знакомства:</p>

      <q-card v-for="hv in help" :key="hv.video" class="part-two__about">
        <q-card-section>
          <div class="text-h6">{{hv.title}}</div>
          <div class="text-subtitle2">{{hv.subTitle}}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-video :src="hv.video"/>
        </q-card-section>
      </q-card>

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
      miniState: true,
      help: [
        {
          video: 'https://www.youtube.com/embed/b-XKEZptxKk',
          title: 'Самостоятельный тест',
          subTitle: 'Регистрация; Оценка словарного запаса; Оценка граматических знаний; Оценка восприятия на слух.'
        },
        {
          video: 'https://www.youtube.com/embed/0cndopEcbac',
          title: 'Устное тестирование',
          subTitle: 'Управление пользователями; Устный тест; Результат тестирования; Программа занятий; Курсы;'
        }
      ]
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
  .part-two__about {
    width: 50vw;
    height: auto;
  }
</style>
