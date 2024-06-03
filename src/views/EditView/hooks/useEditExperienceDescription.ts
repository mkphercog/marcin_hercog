import { reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditExperienceDescription = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const experienceDescription = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watchEffect(() => {
    checkInputField(
      experienceDescription,
      originalWebContent.value.editable.experienceSectionDescription,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    experienceDescription.value = webContent.value.editable.experienceSectionDescription
  })

  return { experienceDescription }
}
