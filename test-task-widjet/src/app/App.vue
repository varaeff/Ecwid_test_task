<script setup lang="ts">
import { SettingsIcon } from '@/shared/ui'
import advisedProducts from '@/widgets/advisedProducts'
import WidgetSettings from '@/widgets/WidgetSettings'
import { ref, watch } from 'vue'
import { storeSettings } from './stores/storeSettings'

const store = storeSettings()
const showSettings = ref(store.showSettings)

const updateShowSettings = () => {
  showSettings.value = store.showSettings
}

updateShowSettings()

watch(
  () => store.showSettings,
  () => {
    updateShowSettings()
  }
)

const showWidget = ref(store.showWidget)

const updateShowWidget = () => {
  showWidget.value = store.showWidget
}

updateShowWidget()

watch(
  () => store.showWidget,
  () => {
    updateShowWidget()
  }
)
</script>

<template>
  <SettingsIcon />
  <WidgetSettings v-if="showSettings" />
  <advisedProducts v-else-if="showWidget" />
</template>
