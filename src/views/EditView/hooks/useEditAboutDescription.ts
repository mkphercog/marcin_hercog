import { reactive, watch, watchEffect } from 'vue'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditAboutDescriptionField = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const aboutDescription = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watch(aboutDescription, () => {
    checkInputField(
      aboutDescription,
      webContentStore.originalWebContent.about.description,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    aboutDescription.value = webContentStore.webContent.about.description
  })

  return { aboutDescription }
}
