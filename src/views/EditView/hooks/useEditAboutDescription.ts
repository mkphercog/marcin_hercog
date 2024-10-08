import { reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'
import { ABOUT_DESC_MAX_LENGTH } from '@/constants'

export const useEditAboutDescriptionField = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const aboutDescription = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watchEffect(() => {
    checkInputField(
      aboutDescription,
      originalWebContent.value.editable.aboutSectionDescription,
      ABOUT_DESC_MAX_LENGTH,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    aboutDescription.value = webContent.value.editable.aboutSectionDescription
  })

  return { aboutDescription }
}
