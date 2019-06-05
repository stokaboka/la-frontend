<template>
  <q-layout view="hHh lpR fFf">

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
import { mapGetters } from 'vuex'
// import UserLogInOutButton from 'components/ui/auth/UserLogInOutButton'
import LaHeader from '../components/LaHeader'
import LaFooter from '../components/LaFooter'

export default {
  name: 'LaLayout',
  components: { LaFooter, LaHeader },
  data () {
    return {
      selectedTab: 'about'
    }
  },
  computed: {
    showTitle () {
      return this.$route.meta.title
    },
    showTestTitle () {
      return this.showTitle && this.mode === 'test'
    },
    ...mapGetters('auth', [
      'isLogged',
      'isAdmin',
      'isOperator',
      'isUser',
      'user'
    ]),
    ...mapGetters('app', ['title', 'mode', 'leftDrawer', 'rightDrawer', 'module', 'testTitle', 'description'])
  }
}
</script>

<style scoped>
.img-logo__normal {
  width: 176px;
  height: auto;
}
.img-logo__small {
  width: 88px;
  height: auto;
}
.img-logo__anim {
  transition: height, width ease 300ms;
}

.part-title__border {
  border-bottom: 2px solid #027BE3;
}
</style>
