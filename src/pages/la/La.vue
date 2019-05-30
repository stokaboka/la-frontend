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
<!--      <logo class="q-mt-md q-ml-md"/>-->
        <div class="q-my-lg text-h4 text-grey-10 text-weight-medium part-title__border">
          {{title}} {{description}}
        </div>

      <router-view />

      <div class="q-pa-md text-grey-14 text-body1">
        <p>
          Вы можете
          <router-link :to="{ path: 'home' }">прервать</router-link> тест в
          любой момент.<br>Текущий тест будет прерван, но Вы сможете продолжить
          тестирование в следующий раз.
        </p>
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
// import Logo from '../../components/ui/Logo'

export default {
  name: 'La',
  components: { RightInfoPanel, LeftInfoPanel },
  computed: {
    ...mapGetters('app', ['leftDrawer', 'rightDrawer', 'module']),
    ...mapGetters('test', ['title', 'description'])
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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
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
