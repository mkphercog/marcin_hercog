<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '@/views/EditView/types/EditView.types'
import { checkInputField } from '@/views/EditView/utils/EditView.helpers'
import { clearNewExperienceItemField } from './EditExperience.helpers'
import { EXP_ITEM_MAX_LENGTH } from '@/constants'

import styles from './EditExperience.module.scss'

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
    const originalContent = webContentStore.originalWebContent.editable.experienceSectionList.find(
      (originalItem) => newExperienceItem.id === originalItem.id
    )

    checkInputField(
      newExperienceItem,
      originalContent?.description || '',
      EXP_ITEM_MAX_LENGTH,
      appStateStore.hasLocalChanges
    )
  }
})

const currentLang = computed(() => appStateStore.currentLanguage)
watch(currentLang, () => {
  clearNewExperienceItemField(newExperienceItem)
})

const addNewExperienceItem = () => {
  if (isFormValid.value) {
    webContentStore.addExperienceListItem(newExperienceItem.value!)

    clearNewExperienceItemField(newExperienceItem)
  }
}
</script>

<template>
  <BaseCard :class="styles.addNewContainer">
    <BaseText>
      {{ webContentStore.webContent.staticEditMode.addNewItemHeader }}
    </BaseText>
    <BaseTextarea
      name="newExperienceListItem"
      label="Description"
      :is-valid="newExperienceItem.isValid && !newExperienceItem.error"
      :error-message="newExperienceItem.error"
      v-model="newExperienceItem.value"
      :max-length="EXP_ITEM_MAX_LENGTH"
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
      {{ webContentStore.webContent.staticEditMode.addNewItemBtn }}
    </BaseButton>
  </BaseCard>
</template>
