<template>
  <q-layout view="hHh lpR fFf">

    <la-header/>

<!--    <la-part-two-drawer/>-->

    <q-page-container class="bg-white">
      <transition-group
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
        mode="out-in"
      >
        <la-user-manager key="usermanager"></la-user-manager>

        <router-view key="laadmin"/>
      </transition-group>
    </q-page-container>

    <la-footer/>
  </q-layout>
</template>

<script>

import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'
// import LaPartTwoDrawer from '../components/LaPartTwoDrawer'
// import LaUser from '../components/ui/part-two/LaUser'
// import LaManager from '../components/ui/part-two/LaManager'
import LaUserManager from '../components/la/part-two/LaUserManager'

export default {
  name: 'LaPartTwoLayout',
  components: {
    LaUserManager,
    // LaManager,
    // LaUser,
    // LaPartTwoDrawer,
    LaFooter,
    LaHeader
  }
}
</script>

<style scoped></style>
