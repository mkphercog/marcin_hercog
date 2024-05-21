<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseButton, BaseLink } from '@/components/ui'
import { useTranslationsStore, useAppStateStore } from '@/store'
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

const store = useTranslationsStore()
const { translations } = storeToRefs(store)
const appStateStore = useAppStateStore()
const route = useRoute()

const TRANSLATIONS_PER_PAGE_MAP: Record<RouteNamesEnum, HeaderContent> = {
  home: {
    linkTo: { name: RouteNamesEnum.EDIT_MODE },
    linkBtnText: computed(() => translations.value.header.editBtn),
    headerText: computed(() => translations.value.header.fullName),
    additionalInfoText: computed(() => translations.value.header.jobPosition)
  },
  editMode: {
    linkTo: { name: RouteNamesEnum.HOME },
    linkBtnText: computed(() => translations.value.editMode.backBtn),
    headerText: computed(() => translations.value.editMode.header),
    additionalInfoText: computed(
      () => `${translations.value.editMode.currentLang} ${appStateStore.getCurrentLanguage}`
    )
  }
}

const headerContent = computed(() => TRANSLATIONS_PER_PAGE_MAP[route.name as RouteNamesEnum])
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.wrapper">
      <nav :class="styles.nav">
        <BaseLink :to="headerContent.linkTo" size="sm" variant="secondary">
          {{ headerContent.linkBtnText.value }}
        </BaseLink>
        <BaseText v-if="appStateStore.getHasLocalChanges" :class="styles.localChanges" size="sm">
          {{ translations.editMode.localChangesInfo }}
        </BaseText>
        <BaseButton @click="appStateStore.toggleCurrentLanguage" type="normal">{{
          translations.header.langBtn
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
