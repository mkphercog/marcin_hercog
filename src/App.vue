<script setup lang="ts">
import { TheHeader, TheFooter } from '@/components'
import HomeView from '@/views/HomeView/HomeView.vue'
import { useTranslationsStore } from '@/store'

const store = useTranslationsStore()
</script>

<template>
  <BaseLoader :active="store.isLoading" loader="dots" />
  <div v-if="!!store.translations">
    <TheHeader />
    <HomeView />
    <TheFooter />
  </div>
</template>
