<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'
import { BaseLink, BaseText } from '@/components/ui'
import { RouteNamesEnum } from '@/routes'
import CancelCircleIcon from '@/assets/icons/CancelCircleIcon.vue'
import { useWebContentStore } from '@/store'

import styles from './NotFoundView.module.scss'

const webContentStore = useWebContentStore()

const goToHomePage: RouteLocationNamedRaw = {
  name: RouteNamesEnum.HOME,
  replace: true
}
</script>

<template>
  <div :class="styles.wrapper">
    <CancelCircleIcon :class="styles.notFoundIcon" />
    <BaseText :as="'h3'">
      {{ webContentStore.webContent.notFound.message }}
    </BaseText>
    <BaseLink :to="goToHomePage">
      {{ webContentStore.webContent.notFound.backBtn }}
    </BaseLink>
  </div>
</template>
