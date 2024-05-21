<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseButton, BaseText, BaseCard } from '@/components/ui'
import InfoIcon from '@/assets/icons/InfoIcon.vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { EditAbout, EditHeader } from './components'
import { useEditView } from './hooks/useEditView'

import styles from './EditView.module.scss'

const { formFields, formState, submitForm } = useEditView()

const appStateStore = useAppStateStore()
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
      <div :class="styles.actionsWrapper">
        <BaseButton variant="secondary" :class="styles.submitBtn" :disabled="!formState.isValid">
          {{ webContent.editMode.submitBtn }}
        </BaseButton>

        <BaseButton
          v-if="appStateStore.hasLocalChanges"
          @click="webContentStore.restoreWebContent"
          type="button"
          variant="secondary"
        >
          {{ webContent.editMode.restoreBtn }}
        </BaseButton>

        <!-- TODO PUBLISH DATA VIA ADMIN -->
        <BaseButton v-if="false" type="button" variant="secondary" :disabled="true">
          {{ webContent.editMode.publishBtn }}
        </BaseButton>
      </div>
    </form>
  </main>
</template>
