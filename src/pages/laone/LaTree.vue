<template>
  <div>
    <section v-if="state === 'start'">
      <div class="text-body1 text-grey-14">
        <div v-html="latree.message"></div>
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
      <group-multi-choice
        :data="questions"
        @on-answer="onAnswer"
        @on-ready="onReady"
      ></group-multi-choice>
    </section>

    <section v-if="state === 'end'">
      <div class="q-my-lg text-h4 text-weight-medium">{{latree.end.title}}</div>
      <div class="text-body1" v-html="latree.end.message">
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
import GroupMultiChoice from '../../components/la/part-one/GroupMultiChoice'
export default {
  name: 'LaTree',
  components: { GroupMultiChoice },
  mixins: [mixin],

  mounted () {
    this.SET_MODULE('tree')
    this.SET_SHOW_NEXT(false)
    this.CLEAR_QUESTIONS()
    this.resetState()
  }
}
</script>

<style></style>
