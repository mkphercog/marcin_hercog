<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput } from '@/components/ui'
import type { ProgrammingSkillInputType } from '@/views/EditView/types/EditView.types'
import { checkIsProgrammingSkillFieldValid } from '@/views/EditView/utils/EditView.helpers'

import styles from './EditProgrammingAddNew.module.scss'

const webContentStore = useWebContentStore()
const appStateStore = useAppStateStore()

const isFormValid = ref(false)
const newSkill = reactive<ProgrammingSkillInputType>({
  id: '',
  label: {
    value: undefined,
    error: null,
    isValid: undefined
  },
  scaleValue: {
    value: undefined,
    error: null,
    isValid: undefined
  }
})

watch(newSkill, () => {
  const isValid = !!newSkill.label.isValid && !!newSkill.scaleValue.isValid
  const noErrors = !newSkill.label.error && !newSkill.scaleValue.error

  isFormValid.value = isValid && noErrors

  if (newSkill.label.value !== undefined && newSkill.scaleValue.value !== undefined) {
    const originalContent = webContentStore.originalWebContent.programmingSkills.skillsList.find(
      (originalSkill) => newSkill.id === originalSkill.id
    )

    checkIsProgrammingSkillFieldValid(newSkill, originalContent, 50, appStateStore.hasLocalChanges)
  }
})

const addNewSkill = () => {
  if (isFormValid.value) {
    webContentStore.addProgrammingSkill(newSkill.label.value!, newSkill.scaleValue.value!)

    newSkill.label = {
      value: undefined,
      error: null,
      isValid: undefined
    }

    newSkill.scaleValue = {
      value: undefined,
      error: null,
      isValid: undefined
    }
  }
}
</script>

<template>
  <BaseCard :class="styles.addNewContainer">
    <BaseInput
      name="label"
      label="Label"
      :is-valid="newSkill.label.isValid && !newSkill.label.error"
      :error-message="newSkill.label.error"
      v-model="newSkill.label.value"
    />
    <BaseInput
      name="label"
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
      Add new skill
    </BaseButton>
  </BaseCard>
</template>
