<template>
  <q-layout view="hHh lpR fff">

    <la-header/>

    <la-part-two-drawer/>

    <q-page-container class="bg-white">
      <transition
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </q-page-container>

    <la-footer/>
  </q-layout>
</template>

<script>

import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'
import LaPartTwoDrawer from '../components/LaPartTwoDrawer'

export default {
  name: 'LaPartTwoLayout',
  components: { LaPartTwoDrawer, LaFooter, LaHeader }
}
</script>

<style scoped></style>
