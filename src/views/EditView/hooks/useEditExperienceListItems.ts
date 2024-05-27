import { computed, reactive, watch } from 'vue'
import type { InputValuesType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkInputField } from '../utils/EditView.helpers'

export const useEditExperienceListItems = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const formExperienceListItems = reactive<InputValuesType[]>([])

  const webExperienceList = computed(() => webContentStore.webContent.experience.experienceList)
  watch(
    webExperienceList,
    () => {
      formExperienceListItems.splice(0, formExperienceListItems.length)
      webExperienceList.value.map((item) => {
        formExperienceListItems.push({
          id: item.id,
          value: item.description,
          error: null,
          hasChanges: false,
          isValid: undefined
        })
      })
    },
    { immediate: true }
  )

  watch(formExperienceListItems, () => {
    formExperienceListItems.forEach((item) => {
      const originalContent = webContentStore.originalWebContent.experience.experienceList.find(
        (originalItem) => item.id === originalItem.id
      )

      checkInputField(item, originalContent?.description || '', 200, appStateStore.hasLocalChanges)
    })
  })

  return { formExperienceListItems }
}
