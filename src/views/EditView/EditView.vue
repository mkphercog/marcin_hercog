<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseText, BaseCard } from '@/components/ui'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import { useWebContentStore } from '@/store'
import { EditAbout, EditHeader, EditProgramming, EditViewActions } from './components'
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
        {{ webContent.editMode.hintInfo }}
      </BaseText>
    </BaseCard>
    <form @submit.prevent="submitForm" :class="styles.form">
      <EditHeader :job-position="formFields.jobPosition" />
      <EditAbout :about-desc="formFields.aboutDesc" />
      <EditProgramming
        :programming-skills="formFields.mappedProgrammingSkillsList"
        :additional-programming-desc="formFields.additionalProgrammingDesc"
      />
      <EditViewActions :is-form-valid="formState.isValid" />
    </form>
  </main>
</template>
