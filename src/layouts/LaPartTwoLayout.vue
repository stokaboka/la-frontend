<template>
  <q-layout view="hHh lpR fff">

    <la-header/>

    <la-part-two-drawer/>

    <q-page-container class="bg-white">
      <transition-group
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        mode="out-in"
      >

        <la-user key="lauser"/>

        <router-view key="laadmin"/>
      </transition-group>
    </q-page-container>

    <la-footer/>
  </q-layout>
</template>

<script>

import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'
import LaPartTwoDrawer from '../components/LaPartTwoDrawer'
import LaUser from '../components/ui/LaUser'

export default {
  name: 'LaPartTwoLayout',
  components: { LaUser, LaPartTwoDrawer, LaFooter, LaHeader }
}
</script>

<style scoped></style>
