<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput, BaseText } from '@/components/ui'
import type { CodingSkillInputType } from '@/views/EditView/types/EditView.types'
import { checkCodingSkillField } from '@/views/EditView/utils/EditView.helpers'
import { clearNewSkillFields } from './EditCodingSection.helpers'
import { CODING_LABEL_MAX_LENGTH } from '@/constants'

import styles from './EditCodingSection.module.scss'

const webContentStore = useWebContentStore()
const appStateStore = useAppStateStore()

const isFormValid = ref(false)
const newSkill = reactive<CodingSkillInputType>({
  id: '',
  label: {
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  },
  scaleValue: {
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  }
})

watch(newSkill, () => {
  const isValid = !!newSkill.label.isValid && !!newSkill.scaleValue.isValid
  const noErrors = !newSkill.label.error && !newSkill.scaleValue.error

  isFormValid.value = isValid && noErrors

  if (newSkill.label.value !== undefined && newSkill.scaleValue.value !== undefined) {
    const originalContent = webContentStore.originalWebContent.editable.codingSectionList.find(
      (originalSkill) => newSkill.id === originalSkill.id
    )

    checkCodingSkillField(
      newSkill,
      originalContent,
      CODING_LABEL_MAX_LENGTH,
      appStateStore.hasLocalChanges
    )
  }
})

const currentLang = computed(() => appStateStore.currentLanguage)
watch(currentLang, () => {
  clearNewSkillFields(newSkill)
})

const addNewSkill = () => {
  if (isFormValid.value) {
    webContentStore.addCodingSkill(newSkill.label.value!, newSkill.scaleValue.value!)

    clearNewSkillFields(newSkill)
  }
}
</script>

<template>
  <BaseCard :class="styles.addNewContainer">
    <BaseText>
      {{ webContentStore.webContent.staticEditMode.addNewItemHeader }}
    </BaseText>
    <BaseInput
      name="newlabel"
      label="Label"
      :is-valid="newSkill.label.isValid && !newSkill.label.error"
      :error-message="newSkill.label.error"
      v-model="newSkill.label.value"
      :max-length="CODING_LABEL_MAX_LENGTH"
    />
    <BaseInput
      name="newScaleValue"
      label="ScaleValue"
      :is-valid="newSkill.scaleValue.isValid && !newSkill.scaleValue.error"
      :error-message="newSkill.scaleValue.error"
      v-model="newSkill.scaleValue.value"
      :rest-props="{
        type: 'number'
      }"
    />

    <BaseButton
      @click="addNewSkill"
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
