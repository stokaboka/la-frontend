<template>
  <q-layout view="hHh lpR fff">

    <la-header/>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>

    <la-footer/>
  </q-layout>
</template>

<script>

import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'

export default {
  name: 'LaPartOneLayout',
  components: { LaFooter, LaHeader }
}
</script>

<style scoped></style>
