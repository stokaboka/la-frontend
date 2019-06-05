<template>
  <q-drawer
    v-model="drawer"

    :mini="!drawer || miniState"
    @click.capture="drawerClick"

    :width="200"
    :breakpoint="500"
    show-if-above
    bordered
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item>

        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>

          <q-item-section>
            Drafts
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <!--
      in this case, we use a button (can be anything)
      so that user can switch back
      to mini-mode
    -->
    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
      <q-btn
        dense
        round
        unelevated
        color="accent"
        icon="chevron_left"
        @click="miniState = true"
      />
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: 'LaPartTwoDrawer',
  data () {
    return {
      drawer: true,
      miniState: true
    }
  },

  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>

<style>
</style>
