<template>
  <div>
    <section v-if="state === 'start'">
<!--      <div class="q-my-lg text-h4 text-weight-medium">-->
<!--        Часть № 2 - Грамматика-->
<!--      </div>-->
      <div class="q-pl-lg text-body1">
        <p>Вторая часть теста займет у Вас около 20 минут.</p>
        <p>
          Каждый тест состоит из текста с пропущенными словами. Всего три
          варианта. Ваша задача выбрать 1 вариант ответа для каждого пропуска.
          Если Вы не помните или не знаете значение слова — нажмите
          <strong><q>Далее</q></strong>
        </p>
        <br />
        <p>
          При ответах, пожалуйста, не пользуйтесь переводчиком, помощью зала или
          звонком другу.
        </p>
        <p>
          Наша задача объективно оценить Ваш уровень знания английского языка,
          чтобы помочь вам лучше знать и использовать иностранный язык в
          повседневной жизни.
        </p>
        <p>Спасибо</p>
      </div>
      <q-btn
        label="Далее"
        color="primary"
        class="q-ma-md"
        @click="nextState()"
      />
    </section>

    <section v-if="state === 'test'" class="row">
      <cloze :data="question" @on-answer="onAnswer" @on-ready="onReady"></cloze>
    </section>

    <section v-if="state === 'end'">
      <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
      <div class="q-pl-lg text-body1">
        <p>Вторая часть теста успешо пройдена.</p>
        <p>Сейчас, Вы можете:</p>
      </div>

      <div v-if="!lastModule" class="row q-ma-md">
        <q-btn
          label="Продолжить тестирование"
          color="primary"
          class="q-ma-md"
          @click="nextPhase()"
        />

        <q-btn
          label="Прерваться и продолжить позже"
          color="secondary"
          class="q-ma-md"
          @click="$router.push({ name: 'home' })"
        />
      </div>
    </section>
  </div>
</template>

<script>
import mixin from './mixin'
import Cloze from '../../components/la/Cloze'

export default {
  name: 'LaTwo',
  components: { Cloze },
  mixins: [mixin],

  mounted () {
    this.SET_MODULE('two')
    this.SET_SHOW_NEXT(true)
    this.CLEAR_QUESTIONS()
  }
}
</script>

<style></style>
