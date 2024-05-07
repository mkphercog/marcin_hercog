<script setup lang="ts">
import { TheHeader, TheFooter } from '@/components'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <TheHeader />
  <HomeView />
  <TheFooter />
</template>

<style lang="scss">
.contentWrapper {
  padding: 0 30px;
}
</style>
