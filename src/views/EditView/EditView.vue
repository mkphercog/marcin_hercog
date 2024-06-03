<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseCard } from '@/components/ui'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import { useWebContentStore } from '@/store'
import {
  EditAbout,
  EditExperience,
  EditHeader,
  EditCodingSection,
  EditViewActions
} from './components'
import { useEditView } from './hooks/useEditView'

import styles from './EditView.module.scss'

const { formFields, formState, submitForm } = useEditView()

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)
</script>

<template>
  <main :class="styles.editMain">
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
