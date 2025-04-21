<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppBarTitle } from '@/stores/appBarTitle'
import { useUserStore } from '@/stores/userStore'
import { useQRTokenStore } from '@/stores/qrToken'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const storeApp = useAppBarTitle()
const { setAppBarTitle } = storeApp

const qrToken = useQRTokenStore()
const { appIsRegistered } = storeToRefs(qrToken)

const router = useRouter()

const rail = ref(false)
const menuRailIcon = ref('mdi-dots-vertical')
const textMenuRail = ref('Mostrar apenas ícones do menu')

const props = defineProps({ drawer: Boolean })
const isDrawerOpen = ref(props.drawer)
const isPermanent = ref(true)
const { mobileBreakpoint } = useDisplay()

watchEffect(() => {
  const display = mobileBreakpoint._object
  isPermanent.value = display.mdAndUp
  isDrawerOpen.value = display.mdAndUp
  rail.value = display.mobile
})

const toggleMenu = () => {
  rail.value = !rail.value
  if (rail.value) {
    menuRailIcon.value = 'mdi-format-list-bulleted-square'
    textMenuRail.value = 'Mostrar texto e ícones do menu'
  } else {
    menuRailIcon.value = 'mdi-dots-vertical'
    textMenuRail.value = 'Mostrar apenas ícones do menu'
  }
}

const toggleAppBarTitle = title => {
  setAppBarTitle(title)
}

const logout = () => {
  useUserStore().logout()
  router.go('/')
}

const listItems = ref([
  {
    icon: 'mdi-sprout',
    title: 'Aplicação Remota 1',
    url: '/dashboard/remote_app1',
    value: 'remoteapp1',
    action: toggleAppBarTitle,
    show: !appIsRegistered.value
  },
  {
    icon: 'mdi-qrcode-scan',
    title: 'Registrar Aplicação no BigBoxx',
    url: '/dashboard/registerapp',
    value: 'registerapp',
    action: toggleAppBarTitle,
    show: appIsRegistered.value
  }
])

const listItemsMenu = computed(() => listItems.value)
watch(appIsRegistered, () => {
  listItemsMenu.value = listItems.value.map(item => {
    item.show = !item.show
    item.active = false
    return item
  })

  toggleAppBarTitle('Home')
})

watch(
  () => props.drawer,
  isDrawer => {
    isDrawerOpen.value = isDrawer
  }
)
</script>

<template>
  <v-navigation-drawer
    class="bg-background position-fixed"
    :permanent="isPermanent"
    :expand-on-hover="isPermanent"
    :rail="rail"
    width="320"
    height="100vh"
    v-model="isDrawerOpen"
  >
    <v-list>
      <v-list-item
        prepend-avatar="../../../assets/eCattle_85px.png"
        title="Plataforma e-Cattle"
        :active="false"
      >
        <template v-slot:append>
          <v-btn
            :icon="menuRailIcon"
            variant="text"
            size="x-small"
            @click="toggleMenu"
            :title="textMenuRail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <!-- <v-divider></v-divider> -->

    <v-list nav>
      <v-list-item
        prepend-icon="mdi-barn"
        title="Home"
        value="apphome"
        to="/dashboard/apphome"
        @click="toggleAppBarTitle('Home')"
      ></v-list-item>
      <v-list-item
        v-for="item in listItemsMenu"
        :disabled="item.show"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.url"
        :value="item.value"
        :active="item.active"
        @click="item.action(item.title)"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-list class="pa-2">
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sair"
          value="logout"
          to="/"
          @click="logout"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
