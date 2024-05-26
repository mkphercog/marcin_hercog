import { reactive, watch, watchEffect } from 'vue'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditCodingDescriptionField = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const codingDescription = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watch(codingDescription, () => {
    checkInputField(
      codingDescription,
      webContentStore.originalWebContent.programmingSkills.additionalDescription,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    codingDescription.value = webContentStore.webContent.programmingSkills.additionalDescription
  })

  return { codingDescription }
}
