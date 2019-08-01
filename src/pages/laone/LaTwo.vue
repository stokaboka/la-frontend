<template>
  <div>
    <section v-if="state === 'start'">
      <div class="text-body1 text-grey-14">
        <div v-html="latwo.message"></div>
        <div v-html="laonecontainer.remark" class="q-mt-lg"></div>
      </div>
      <q-btn
        :label="laonecontainer.buttons.next.label"
        color="primary"
        class="q-my-md"
        @click="nextState()"
      />
    </section>

    <section v-if="state === 'test'" class="row">
      <cloze :data="question" @on-answer="onAnswer" @on-ready="onReady"></cloze>
    </section>

    <section v-if="state === 'end'" class="text-grey-14">
      <div class="q-my-lg text-h4 text-weight-medium">{{latwo.end.title}}</div>
      <div class="text-body1" v-html="latwo.end.message">
      </div>

      <div v-if="!lastModule" class="row q-gutter-md q-my-md">
        <q-btn
          :label="laonecontainer.buttons.resume.label"
          color="primary"
          @click="nextPhase()"
        />

        <q-btn
          :label="laonecontainer.buttons.break.label"
          color="secondary"
          @click="breakTest"
        />
      </div>
    </section>
  </div>
</template>

<script>
import mixin from './mixin'
import Cloze from '../../components/la/part-one/Cloze'

export default {
  name: 'LaTwo',
  components: { Cloze },
  mixins: [mixin],

  mounted () {
    this.SET_MODULE('two')
    this.SET_SHOW_NEXT(true)
    this.CLEAR_QUESTIONS()
    this.resetState()
  }
}
</script>

<style></style>
