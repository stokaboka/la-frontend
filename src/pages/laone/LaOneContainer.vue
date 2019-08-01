<template>
  <q-page class="container">
    <transition
      appear
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
      mode="out-in"
    >
      <left-info-panel
        v-if="leftDrawer"
        class="la-counter q-pt-md"
        :module="module"
      ></left-info-panel>
    </transition>

    <div class="column la-main q-pa-lg shadow-3">

      <router-view />

      <div v-if="isTestState">
        <div v-if="showNext" class="q-mt-md text-grey-14" v-html="laonecontainer.message[0]">
        </div>

        <div v-if="showBreak && isTestState" class="q-my-md text-grey-14 text-body1">
          <span v-html="laonecontainer.message[1]"></span>
            <q-btn
              :label="laonecontainer.buttons.break.label"
              @click="breakTest"
            />
        </div>
      </div>
    </div>

    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
      mode="out-in"
    >
      <right-info-panel
        v-if="rightDrawer"
        class="la-timer q-pt-md "
        :module="module"
      ></right-info-panel>
    </transition>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftInfoPanel from '../../components/LeftInfoPanel'
import RightInfoPanel from '../../components/RightInfoPanel'

export default {
  name: 'La',
  components: { RightInfoPanel, LeftInfoPanel },
  computed: {
    showBreak () {
      return this.$route.meta.break
    },
    showTitle () {
      return this.$route.meta.title
    },
    isTestState () {
      return this.testState === 'test'
    },
    ...mapGetters('app', ['leftDrawer', 'rightDrawer', 'module', 'showNext', 'testState']),
    ...mapGetters('users', ['isLogged', 'authUser', 'isAnonymous']),
    ...mapGetters('results', ['existResults', 'existAnonymousResults', 'existSavedResults']),
    ...mapGetters('text', ['laonecontainer'])
  },
  methods: {
    breakTest () {
      let name = 'home'
      if (this.isLogged) {
        if (this.existResults || this.existAnonymousResults) {
          name = 'part-one-end'
        }
      }
      this.$router.push({ name })
    }
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

.part-title__border {
  border-bottom: 2px solid #027BE3;
}

@media (max-width: 762px) {
  .container {
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "counter timer"
      "main main";
  }
}

.la-counter {
  grid-area: counter;
}

.la-main {
  grid-area: main;
  background-color: white;
}

.la-timer {
  grid-area: timer;
}
</style>
