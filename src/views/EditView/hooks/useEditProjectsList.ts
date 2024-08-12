import { computed, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStateStore, useWebContentStore } from '@/store'
import { checkProjectFields } from '../utils/EditView.helpers'
import { PROJECT_ITEM_MAX_LENGTH } from '@/constants'
import { createProjectFields } from '../components/EditProjects/EditProjectsSection.helpers'
import type { ProjectInputType } from '../types/EditView.types'

export const useEditProjectsList = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const formProjectsList = reactive<ProjectInputType[]>([])
  const webProjectsList = computed(() => webContent.value.editable.projectsSectionList)

  watch(
    webProjectsList,
    () => {
      //I need to clear formProjectsList here before I generate new list
      //without it i'm doubling fields
      formProjectsList.splice(0, formProjectsList.length)
      webProjectsList.value.forEach((project) => {
        formProjectsList.push(createProjectFields(project))
      })
    },
    { immediate: true }
  )

  watch(formProjectsList, () => {
    formProjectsList.forEach((project) => {
      const originalContent = originalWebContent.value.editable.projectsSectionList.find(
        (originalProject) => {
          return project.id === originalProject.id
        }
      )

      checkProjectFields(
        project,
        originalContent,
        PROJECT_ITEM_MAX_LENGTH,
        appStateStore.hasLocalChanges
      )
    })
  })

  return { formProjectsList }
}
