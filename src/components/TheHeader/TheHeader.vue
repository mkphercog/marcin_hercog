<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseButton, BaseLink } from '@/components/ui'
import { useAppStateStore, useWebContentStore } from '@/store'
import { useRoute, type RouterLinkProps } from 'vue-router'
import { computed, type ComputedRef } from 'vue'
import { RouteNamesEnum } from '@/routes'

import styles from './TheHeader.module.scss'

type HeaderContent = {
  linkTo: RouterLinkProps['to']
  linkBtnText: ComputedRef<string>
  headerText: ComputedRef<string>
  additionalInfoText: ComputedRef<string>
}

const { webContent } = storeToRefs(useWebContentStore())
const appStateStore = useAppStateStore()
const route = useRoute()

const WEB_CONTENT_PER_PAGE_MAP: Record<RouteNamesEnum, HeaderContent> = {
  home: {
    linkTo: { name: RouteNamesEnum.EDIT_MODE },
    linkBtnText: computed(() => webContent.value.header.editBtn),
    headerText: computed(() => webContent.value.header.fullName),
    additionalInfoText: computed(() => webContent.value.header.jobPosition)
  },
  editMode: {
    linkTo: { name: RouteNamesEnum.HOME },
    linkBtnText: computed(() => webContent.value.editMode.backBtn),
    headerText: computed(() => webContent.value.editMode.header),
    additionalInfoText: computed(
      () => `${webContent.value.editMode.currentLang} ${appStateStore.currentLanguage}`
    )
  }
}

const headerContent = computed(() => WEB_CONTENT_PER_PAGE_MAP[route.name as RouteNamesEnum])
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.wrapper">
      <nav :class="styles.nav">
        <BaseLink :to="headerContent.linkTo" size="sm" variant="secondary">
          {{ headerContent.linkBtnText.value }}
        </BaseLink>
        <BaseText v-if="appStateStore.hasLocalChanges" :class="styles.localChanges" size="sm">
          {{ webContent.editMode.localChangesInfo }}
        </BaseText>
        <BaseButton @click="appStateStore.toggleCurrentLanguage" type="normal">{{
          webContent.header.langBtn
        }}</BaseButton>
      </nav>

      <div :class="styles.fullNameWrapper">
        <BaseText as="h1" size="lg" variant="secondary">{{
          headerContent.headerText.value
        }}</BaseText>
        <BaseText variant="secondary">{{ headerContent.additionalInfoText.value }}</BaseText>
      </div>
    </div>
  </header>
</template>
