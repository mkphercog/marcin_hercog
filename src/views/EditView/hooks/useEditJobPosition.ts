import { reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditJobPositionField = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const jobPosition = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watchEffect(() => {
    checkInputField(
      jobPosition,
      originalWebContent.value.editable.headerJobPosition,
      40,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    jobPosition.value = webContent.value.editable.headerJobPosition
  })

  return { jobPosition }
}
