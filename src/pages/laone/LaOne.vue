<template>
  <div>
    <section v-if="state === 'start'">
      <div class="text-body1 text-grey-14">
        <p>Первая часть теста займет у Вас около 20 минут.</p>
        <p>
          Ваша задача выбрать один из четырех вариантов перевода для одного
          слова. Если Вы не помните или не знаете значение слова — нажмите
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
      </div>
      <q-btn
        label="Далее"
        color="primary"
        class="q-my-md"
        @click="nextState()"
      />
    </section>

    <section v-if="state === 'test'" class="row">
      <multi-choice
        :data="question"
        @on-answer="onAnswer"
        @on-ready="onReady"
      ></multi-choice>
    </section>

    <section v-if="state === 'end'" class="text-grey-14">
      <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
      <div class="text-body1">
        <p>Первая часть теста успешо пройдена.</p>
        <p>Сейчас, Вы можете:</p>
      </div>

      <div v-if="!lastModule" class="row q-gutter-md q-my-md">
        <q-btn
          label="Продолжить тестирование"
          color="primary"
          @click="nextPhase()"
        />

        <q-btn
          label="Прерваться и продолжить позже"
          color="secondary"
          @click="$router.push({ name: 'home' })"
        />
      </div>
    </section>
  </div>
</template>

<script>
import mixin from './mixin'
import MultiChoice from '../../components/la/part-one/MultiChoice'

export default {
  name: 'LaOne',
  components: { MultiChoice },
  mixins: [mixin],

  mounted () {
    this.SET_MODULE('one')
    this.SET_SHOW_NEXT(true)
    this.CLEAR_QUESTIONS()
    this.resetState()
  }
}
</script>

<style></style>
