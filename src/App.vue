<script setup lang="ts">
import { useAppStateStore, useTranslationsStore } from '@/store'
import { TheFooter, TheHeader } from './components'

useTranslationsStore()
const appStateStore = useAppStateStore()
</script>

<template>
  <BaseLoader :active="appStateStore.getIsLoading" loader="dots" />
  <div v-if="appStateStore.getHasLoadedTranslations">
    <TheHeader />

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>

    <TheFooter />
  </div>
</template>
