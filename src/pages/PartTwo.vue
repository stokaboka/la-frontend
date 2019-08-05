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

import { mapGetters } from 'vuex'
import LaAbout from '../components/LaAbout'
import { oget } from '../lib/utils'

export default {
  name: 'PhaseTwo',
  components: { LaAbout },
  data () {
    return {
      drawer: true,
      miniState: true,
      help: [
        {
          video: '',
          title: 'Самостоятельный тест',
          subTitle: 'Регистрация; Оценка словарного запаса; Оценка граматических знаний; Оценка восприятия на слух.'
        },
        {
          video: '',
          title: 'Устное тестирование',
          subTitle: 'Управление пользователями; Устный тест; Результат тестирования; Программа занятий; Курсы;'
        }
      ]
    }
  },

  mounted () {
    this.help[0].video = oget(this.config, 'part.one.video.about', '')
    this.help[1].video = oget(this.config, 'part.two.video.about', '')
  },

  computed: {
    ...mapGetters('config', ['config'])
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
