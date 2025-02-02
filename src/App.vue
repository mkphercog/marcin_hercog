<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStateStore, useWebContentStore } from '@/store'
import { TheFooter, TheHeader } from './components'
import { BaseCard } from './components/ui'

import styles from './App.module.scss'

const appStateStore = useAppStateStore()
const { currentLanguage } = storeToRefs(appStateStore)
const webContentStore = useWebContentStore()
webContentStore.setCurrentUserData()

watch(currentLanguage, () => webContentStore.fetchWebContent(false), {
  immediate: true
})
</script>

<template>
  <BaseLoader :active="appStateStore.isLoading" loader="dots" />
  <div v-if="appStateStore.hasLoadedWebContent" :class="styles.appWrapper">
    <TheHeader />

    <main :class="styles.mainWrapper">
      <BaseCard :class="styles.mainCard">
        <RouterView v-slot="{ Component }">
          <KeepAlive exclude="LoginView">
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </BaseCard>
    </main>
    <TheFooter />
  </div>
</template>
