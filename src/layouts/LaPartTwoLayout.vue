<template>
  <q-layout view="hHh lpR fff">

    <la-header/>

    <q-page-container class="bg-white">
      <transition-group
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        mode="out-in"
      >
        <la-user-manager v-if="!isAboutPage" key="usermanager" class="q-layout-padding"></la-user-manager>

        <router-view key="laadmin"/>

      </transition-group>
    </q-page-container>

    <la-footer/>
  </q-layout>
</template>

<script>

import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'
import LaUserManager from '../components/la/part-two/LaUserManager'

export default {
  name: 'LaPartTwoLayout',
  components: {
    LaUserManager,
    LaFooter,
    LaHeader
  },
  computed: {
    isAboutPage () {
      return this.$route.name === 'part-two-home'
    }
  }
}
</script>

<style scoped></style>
