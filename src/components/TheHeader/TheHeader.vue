<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute, type RouteLocationNamedRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import TheLogo from '../TheLogo/TheLogo.vue'
import { BaseText, BaseButton, BaseLink } from '@/components/ui'
import { useAppStateStore, useWebContentStore } from '@/store'
import { RouteNamesEnum } from '@/routes'

import styles from './TheHeader.module.scss'

type HeaderContent = {
  linkTo: RouteLocationNamedRaw
  linkBtnText: ComputedRef<string>
  headerText?: ComputedRef<string>
  additionalInfoText?: ComputedRef<string>
}

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)
const appStateStore = useAppStateStore()
const { isLoggedUser } = storeToRefs(appStateStore)
const route = useRoute()

const WEB_CONTENT_PER_PAGE_MAP: Record<RouteNamesEnum, HeaderContent> = {
  home: {
    linkTo: { name: RouteNamesEnum.EDIT_MODE },
    linkBtnText: computed(() => webContent.value.staticHomeView.editSiteBtn),
    headerText: computed(() => webContent.value.staticHomeView.fullName),
    additionalInfoText: computed(() => webContent.value.editable.headerJobPosition)
  },
  editMode: {
    linkTo: { name: RouteNamesEnum.HOME },
    linkBtnText: computed(() => webContent.value.staticEditMode.backBtn),
    headerText: computed(() => webContent.value.staticEditMode.title),
    additionalInfoText: computed(
      () => `${webContent.value.staticEditMode.subTitle} ${appStateStore.currentLanguage}`
    )
  },
  login: {
    linkTo: { name: RouteNamesEnum.EDIT_MODE },
    linkBtnText: computed(() => webContent.value.staticEditMode.backBtn),
    headerText: computed(() => webContent.value.staticLoginView.title)
  },
  notFound: {
    linkTo: { name: RouteNamesEnum.HOME },
    linkBtnText: computed(() => webContent.value.staticNotFoundView.backBtn),
    additionalInfoText: computed(() => webContent.value.staticNotFoundView.header)
  }
}

const headerContent = computed(() => WEB_CONTENT_PER_PAGE_MAP[route.name as RouteNamesEnum])
</script>

<template>
  <header :class="styles.header">
    <div :class="styles.wrapper">
      <div v-if="isLoggedUser" :class="styles.loginBar">
        <BaseText :class="styles.localChanges" size="sm">
          {{ webContent.staticLoginView.loggedUserHint }}
          {{ webContentStore.currentLoggedUserName }}
        </BaseText>
        <BaseButton size="sm" @click="appStateStore.logout">{{
          webContent.staticLoginView.logoutBtn
        }}</BaseButton>
      </div>

      <nav :class="styles.nav">
        <TheLogo />
        <div :class="styles.actionBtns">
          <BaseLink :to="headerContent.linkTo" size="sm" variant="secondary">
            {{ headerContent.linkBtnText.value }}
          </BaseLink>
          <BaseButton @click="appStateStore.toggleCurrentLanguage" type="normal">
            {{ webContent.staticHomeView.changeLangBtn }}
          </BaseButton>
        </div>
      </nav>

      <BaseText v-if="appStateStore.hasLocalChanges" :class="styles.localChanges" size="sm">
        {{ webContent.staticEditMode.localChangesInfo }}
      </BaseText>

      <div :class="styles.fullNameWrapper">
        <BaseText v-if="headerContent.headerText?.value" as="h1" size="lg" variant="secondary">
          {{ headerContent.headerText.value }}
        </BaseText>
        <BaseText variant="secondary">
          {{ headerContent.additionalInfoText?.value }}
        </BaseText>
      </div>
    </div>
  </header>
</template>
