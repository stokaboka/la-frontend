<template>
  <q-drawer
    v-model="drawer"
    :mini="!drawer || miniState"
    @click.capture="drawerClick"
    :width="250"
    :breakpoint="1024"
    behavior="desktop"
    show-if-above
    bordered
    elevated
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="item in items"
          :key="item.id"
          :active="item.active"
          clickable
          v-ripple
          @click="onItemClick(item)"
        >
          <q-item-section avatar>
            <q-icon
              :name="item.icon"
              :color="item.active ? 'primary' : 'secondary'"
            />
          </q-item-section>

          <q-item-section :color="item.active ? 'primary' : 'secondary'">
            {{ item.label }}
          </q-item-section>

          <q-item-section side top v-if="item.badge.label">
            <q-badge :color="item.badge.color" :label="item.badge.label" />
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </q-list>
    </q-scroll-area>

    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -18px">
      <q-btn
        dense
        round
        unelevated
        color="primary"
        icon="chevron_left"
        @click="miniState = true"
      />
    </div>
  </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LaPartTwoDrawer',
  data () {
    return {
      drawer: true,
      miniState: false,
      items: [
        {
          id: 'users',
          icon: 'person',
          label: 'Пользователи',
          route: 'part-two-users',
          active: true,
          badge: {
            floating: true,
            color: 'green',
            label: '4k'
          }
        },
        // {
        //   id: 'attempts',
        //   icon: 'offline_pin',
        //   label: 'Тесты',
        //   route: 'part-two-user-tests',
        //   active: false,
        //   badge: {
        //     floating: true,
        //     color: 'red',
        //     label: ''
        //   }
        // },
        {
          id: 'results',
          icon: 'ballot',
          label: 'Результат',
          route: 'part-two-user-results',
          active: false,
          badge: {
            floating: true,
            color: 'red',
            label: ''
          }
        }
      ]
    }
  },
  async mounted () {
    await this.usersList()
  },
  computed: {
    ...mapGetters('users', ['usersTotalCount'])
  },
  methods: {
    onItemClick (item) {
      this.items = this.items.map(e => {
        e.active = e.id === item.id
        return e
      })
      if (item.route) {
        this.$router.push({ name: item.route })
      }
    },
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    },
    ...mapActions('users', ['usersList'])
  },

  watch: {
    usersTotalCount (val, oldVal) {
      const item = { ...this.items[0],
        badge: {
          floating: true,
          color: val !== oldVal ? 'red' : 'green',
          label: `${val}`
        } }
      this.items.splice(0, 1, item)
    }
  }
}
</script>

<style></style>
