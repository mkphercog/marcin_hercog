<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseButton, BaseText, BaseIcon, BaseCard } from '@/components/ui'
import InfoIcon from '@/assets/icons/info-icon.svg'
import { useTranslationsStore, useAppStateStore } from '@/store'
import EditHeader from './components/EditHeader/EditHeader.vue'
import EditAbout from './components/EditAbout/EditAbout.vue'
import { useEditView } from './hooks/useEditView'

import styles from './EditView.module.scss'

const { formFields, formState, submitForm } = useEditView()

const store = useTranslationsStore()
const appStateStore = useAppStateStore()
const { translations } = storeToRefs(store)
const { restoreTranslations } = store
</script>

<template>
  <main :class="styles.editMain">
    <BaseCard :class="styles.infoCard">
      <BaseIcon :class="styles.infoIcon" :src="InfoIcon" alt="Info icon" />
      <BaseText size="sm" justify>
        {{ translations.editMode.hintInfo }}
      </BaseText>
    </BaseCard>
    <form @submit.prevent="submitForm" :class="styles.form">
      <EditHeader :job-position="formFields.jobPosition" />
      <EditAbout :about-desc="formFields.aboutDesc" />
      <div :class="styles.actionsWrapper">
        <BaseButton variant="secondary" :class="styles.submitBtn" :disabled="!formState.isValid">
          {{ translations.editMode.submitBtn }}
        </BaseButton>

        <BaseButton
          v-if="appStateStore.getHasLocalChanges"
          @click="restoreTranslations"
          type="button"
          variant="secondary"
        >
          {{ translations.editMode.restoreBtn }}
        </BaseButton>

        <!-- TODO PUBLISH DATA VIA ADMIN -->
        <BaseButton v-if="false" type="button" variant="secondary" :disabled="true">
          {{ translations.editMode.publishBtn }}
        </BaseButton>
      </div>
    </form>
  </main>
</template>
