<template>
  <div>
    <section v-if="state === 'start'">
<!--      <div class="q-my-lg text-h4 text-weight-medium">-->
<!--        Часть № 3 - Восприятие на слух-->
<!--      </div>-->
      <div class="q-pl-lg text-body1">
        <p>Третья часть теста займет у Вас около 30 минут.</p>
        <p>
          Перед Вами тест по восприятию на слух. Ваша задача:
        </p>
        <ul>
          <li>Внимательно прочитать задание</li>
          <li>Внимательно просмотреть предложенные варианты ответов</li>
          <li>Включить соответствующую тексту аудио-запись</li>
          <li>Прослушать текст до конца (текст будет проигран 2 раза)</li>
          <li>Ответить на вопросы задания</li>
        </ul>
        Если Вы не помните или не знаете значение слова — нажмите
        <strong><q>Далее</q></strong>
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
      <group-multi-choice
        :data="questions"
        @on-answer="onAnswer"
        @on-ready="onReady"
      ></group-multi-choice>
    </section>

    <section v-if="state === 'end'">
      <div class="q-my-lg text-h4 text-weight-medium">Поздравляем!</div>
      <div class="q-pl-lg text-body1">
        <p>Тестирование успешно пройдено.</p>
        <p>Ваш менеджер свяжется с вами в течение суток</p>
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
import GroupMultiChoice from '../../components/la/GroupMultiChoice'
export default {
  name: 'LaTree',
  components: { GroupMultiChoice },
  mixins: [mixin],

  mounted () {
    this.SET_MODULE('tree')
    this.SET_MODULE_TEST('tree')
    this.SET_SHOW_NEXT(false)
    this.CLEAR_QUESTIONS()
  }
}
</script>

<style></style>
