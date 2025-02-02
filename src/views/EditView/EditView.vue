<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseLink, BaseButton, BaseDivider } from '@/components/ui'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import {
  EditAbout,
  EditExperience,
  EditHeader,
  EditCodingSection,
  EditViewActions,
  EditProjectsSection
} from './components'
import { useEditView } from './hooks/useEditView'
import { RouteNamesEnum } from '@/routes'
import { openUrlInNewTab } from '@/helpers/general'
import { CURRENT_WEB_GITHUB_LINK } from '@/constants'

import styles from './EditView.module.scss'

const { formFields, formState, submitForm } = useEditView()

const appStateStore = useAppStateStore()
const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

const goToLoginView = { name: RouteNamesEnum.LOGIN }
</script>

<template>
  <main :class="styles.editMain">
    <div v-if="!appStateStore.isLoggedUser" :class="styles.loginButton">
      <BaseLink size="sm" :to="goToLoginView">
        {{ webContent.staticEditMode.loginBtn }}
      </BaseLink>
    </div>

    <div :class="styles.infoCard">
      <InfoIcon :class="styles.infoIcon" />
      <BaseText :class="styles.infoText" size="sm" justify>
        {{ webContent.staticEditMode.aboutWebInfo }}
      </BaseText>
      <BaseText :class="styles.checkCode" size="sm" justify>
        {{ webContent.staticEditMode.checkCurrentWebCode }}
      </BaseText>
      <BaseButton
        @click="openUrlInNewTab(CURRENT_WEB_GITHUB_LINK)"
        :class="styles.githubBtn"
        variant="green"
        size="sm"
      >
        Github
      </BaseButton>
    </div>

    <BaseDivider />

    <form @submit.prevent="submitForm" :class="styles.form">
      <EditHeader :job-position="formFields.jobPosition" />
      <EditAbout :about-description="formFields.aboutDescription" />
      <EditCodingSection
        :coding-skills="formFields.formCodingSkillsList"
        :additional-coding-desc="formFields.codingDescription"
      />
      <EditExperience
        :experience-description="formFields.experienceDescription"
        :experience-list-items="formFields.formExperienceListItems"
      />
      <EditProjectsSection :projects="formFields.formProjectsList" />
      <EditViewActions :is-form-valid="formState.isValid" />
    </form>
  </main>
</template>
