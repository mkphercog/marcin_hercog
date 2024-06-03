import { reactive, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditCodingDescriptionField = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
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
      originalWebContent.value.editable.codingSectionDescription,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    codingDescription.value = webContent.value.editable.codingSectionDescription
  })

  return { codingDescription }
}
