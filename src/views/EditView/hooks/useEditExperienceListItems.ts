import { computed, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkInputField } from '../utils/EditView.helpers'

export const useEditExperienceListItems = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const formExperienceListItems = reactive<InputValuesType[]>([])

  const webExperienceList = computed(() => webContent.value.editable.experienceSectionList)
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
      const originalContent = originalWebContent.value.editable.experienceSectionList.find(
        (originalItem) => item.id === originalItem.id
      )

      checkInputField(item, originalContent?.description || '', 1024, appStateStore.hasLocalChanges)
    })
  })

  return { formExperienceListItems }
}
