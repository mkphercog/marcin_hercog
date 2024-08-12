<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useAppStateStore, useWebContentStore } from '@/store'
import { BaseButton, BaseCard, BaseInput, BaseText } from '@/components/ui'
import type { ProjectInputType } from '@/views/EditView/types/EditView.types'
import { checkProjectFields } from '@/views/EditView/utils/EditView.helpers'
import { clearNewProjectFields, createProjectFields } from './EditProjectsSection.helpers'
import { PROJECT_ITEM_MAX_LENGTH } from '@/constants'
import { PROJECT_FIELDS_NAMES } from './EditProjects.constants'
import type { ProjectsListItemType } from '@/types'

import styles from './EditProjectsSection.module.scss'

const webContentStore = useWebContentStore()
const appStateStore = useAppStateStore()

const isFormValid = ref(false)

const newProject = reactive<ProjectInputType>(createProjectFields())

watch(newProject, () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...newProjectFields } = newProject
  const isValid = Object.values(newProjectFields).some((field) => !!field.isValid)
  const noErrors = Object.values(newProjectFields).every((field) => !field.error)
  const formReadyToValidate = Object.values(newProjectFields).every(
    (field) => field.value !== undefined
  )

  isFormValid.value = isValid && noErrors

  if (formReadyToValidate) {
    const originalContent = webContentStore.originalWebContent.editable.projectsSectionList.find(
      (originalProject) => newProject.id === originalProject.id
    )

    checkProjectFields(
      newProject,
      originalContent,
      PROJECT_ITEM_MAX_LENGTH,
      appStateStore.hasLocalChanges
    )
  }
})

const currentLang = computed(() => appStateStore.currentLanguage)
watch(currentLang, () => {
  clearNewProjectFields(newProject)
})

const addNewProject = () => {
  if (isFormValid.value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newProjectFields } = newProject
    let newProjectValues = {} as Omit<ProjectsListItemType, 'id'>
    Object.entries(newProjectFields).forEach(([key, field]) => {
      Object.assign(newProjectValues, { [key]: field.value })
    })

    webContentStore.addProject(newProjectValues)
    clearNewProjectFields(newProject)
  }
}
</script>

<template>
  <BaseCard :class="styles.addNewContainer">
    <BaseText :class="styles.sectionTitle">
      {{ webContentStore.webContent.staticEditMode.addNewItemHeader }}
    </BaseText>
    <BaseInput
      v-for="fieldName in PROJECT_FIELDS_NAMES"
      :key="fieldName"
      :name="fieldName"
      :label="fieldName"
      :is-valid="newProject[fieldName].isValid && !newProject[fieldName].error"
      :error-message="newProject[fieldName].error"
      v-model="newProject[fieldName].value"
      :max-length="PROJECT_ITEM_MAX_LENGTH"
      :class="styles[fieldName]"
    />

    <BaseButton
      @click="addNewProject"
      :variant="'secondary'"
      :size="'sm'"
      :rest-props="{
        type: 'button',
        disabled: !isFormValid
      }"
      :class="styles.addBtn"
    >
      {{ webContentStore.webContent.staticEditMode.addNewItemBtn }}
    </BaseButton>
  </BaseCard>
</template>
