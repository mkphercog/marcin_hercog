<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseCard, BaseLink } from '@/components/ui'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import {
  EditAbout,
  EditExperience,
  EditHeader,
  EditCodingSection,
  EditViewActions
} from './components'
import { useEditView } from './hooks/useEditView'
import { RouteNamesEnum } from '@/routes'

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

    <BaseCard :class="styles.infoCard">
      <InfoIcon :class="styles.infoIcon" />
      <BaseText size="sm" justify>
        {{ webContent.staticEditMode.aboutWebInfo }}
      </BaseText>
    </BaseCard>

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
      <EditViewActions :is-form-valid="formState.isValid" />
    </form>
  </main>
</template>
