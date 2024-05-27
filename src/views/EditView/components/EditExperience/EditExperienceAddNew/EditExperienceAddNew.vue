<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput, BaseText } from '@/components/ui'
import type { InputValuesType } from '@/views/EditView/types/EditView.types'
import { checkInputField } from '@/views/EditView/utils/EditView.helpers'

import styles from './EditExperienceAddNew.module.scss'

const webContentStore = useWebContentStore()
const appStateStore = useAppStateStore()

const isFormValid = ref(false)
const newExperienceItem = reactive<InputValuesType>({
  id: '',
  value: undefined,
  error: null,
  isValid: undefined,
  hasChanges: false
})

watch(newExperienceItem, () => {
  isFormValid.value = !!newExperienceItem.isValid && !newExperienceItem.error

  if (newExperienceItem.value !== undefined) {
    const originalContent = webContentStore.originalWebContent.experience.experienceList.find(
      (originalItem) => newExperienceItem.id === originalItem.id
    )

    checkInputField(
      newExperienceItem,
      originalContent?.description || '',
      50,
      appStateStore.hasLocalChanges
    )
  }
})

const addNewExperienceItem = () => {
  if (isFormValid.value) {
    webContentStore.addExperienceListItem(newExperienceItem.value!)

    newExperienceItem.value = undefined
    newExperienceItem.error = null
    newExperienceItem.hasChanges = false
    newExperienceItem.isValid = undefined
  }
}
</script>

<template>
  <BaseCard :class="styles.addNewContainer">
    <BaseText>New experience item</BaseText>
    <BaseInput
      name="newExperienceListItem"
      label="Description"
      :is-valid="newExperienceItem.isValid && !newExperienceItem.error"
      :error-message="newExperienceItem.error"
      v-model="newExperienceItem.value"
    />

    <BaseButton
      @click="addNewExperienceItem"
      :variant="'secondary'"
      :size="'sm'"
      :rest-props="{
        type: 'button',
        disabled: !isFormValid
      }"
    >
      Add new experience item
    </BaseButton>
  </BaseCard>
</template>
