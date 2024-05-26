import { reactive, watch, watchEffect } from 'vue'
import type { InputValuesType } from '../types/EditView.types'
import { checkInputField } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'

export const useEditJobPositionField = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const jobPosition = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  watch(jobPosition, () => {
    checkInputField(
      jobPosition,
      webContentStore.originalWebContent.header.jobPosition,
      40,
      appStateStore.hasLocalChanges
    )
  })

  watchEffect(() => {
    jobPosition.value = webContentStore.webContent.header.jobPosition
  })

  return { jobPosition }
}
