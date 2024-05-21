<script setup lang="ts">
import { useAppStateStore, useWebContentStore } from '@/store'
import { TheFooter, TheHeader } from './components'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const appStateStore = useAppStateStore()
const webContentStore = useWebContentStore()
const { currentLanguage } = storeToRefs(appStateStore)

watch(currentLanguage, () => webContentStore.fetchWebContent(false), {
  immediate: true
})
</script>

<template>
  <BaseLoader :active="appStateStore.isLoading" loader="dots" />
  <div v-if="appStateStore.hasLoadedWebContent">
    <TheHeader />

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <TheFooter />
  </div>
</template>
