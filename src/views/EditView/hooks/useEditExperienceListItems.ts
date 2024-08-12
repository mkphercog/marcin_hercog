import { computed, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkInputField } from '../utils/EditView.helpers'
import { EXP_ITEM_MAX_LENGTH } from '@/constants'

export const useEditExperienceListItems = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const formExperienceListItems = reactive<InputValuesType[]>([])

  const webExperienceList = computed(() => webContent.value.editable.experienceSectionList)

  watch(
    webExperienceList,
    () => {
      //I need to clear formExperienceListItems here before I generate new list
      //without it i'm doubling fields
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

      checkInputField(
        item,
        originalContent?.description || '',
        EXP_ITEM_MAX_LENGTH,
        appStateStore.hasLocalChanges
      )
    })
  })

  return { formExperienceListItems }
}
