<template>
  <q-page class="row justify-center">
    <transition
      appear
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
      mode="out-in"
    >
      <left-info-panel class="col-3" v-if="leftDrawer" :module="module"></left-info-panel>
    </transition>
    <div class="col-6">
      <router-view />
      <div class="q-pa-lg text-grey-14 text-body1">
        <p>Вы можете <router-link :to="{ path: 'home' }">прервать</router-link> тест в любой момент.</p>
        <p>Текущий тест будет прерван, но Вы сможете продолжить тестирование в следующий раз.</p>
      </div>
    </div>
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
      mode="out-in"
    >
      <right-info-panel v-if="rightDrawer" class="col-3" :module="module"></right-info-panel>
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
    ...mapGetters('app', ['title', 'leftDrawer', 'rightDrawer', 'module'])
  }
}
</script>

<style>
</style>
