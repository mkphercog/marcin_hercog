import { reactive, watch, watchEffect } from 'vue'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditExperienceDescription = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const experienceDescription = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watch(experienceDescription, () => {
    checkInputField(
      experienceDescription,
      webContentStore.originalWebContent.experience.description,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    experienceDescription.value = webContentStore.webContent.experience.description
  })

  return { experienceDescription }
}
