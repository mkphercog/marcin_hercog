import { reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'
import { CODING_DESC_MAX_LENGTH } from '@/constants'

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

  watchEffect(() => {
    checkInputField(
      codingDescription,
      originalWebContent.value.editable.codingSectionDescription,
      CODING_DESC_MAX_LENGTH,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    codingDescription.value = webContent.value.editable.codingSectionDescription
  })

  return { codingDescription }
}
