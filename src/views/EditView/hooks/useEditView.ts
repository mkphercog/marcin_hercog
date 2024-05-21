import { computed, onUpdated, reactive, shallowReactive, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { checkIsFieldValid, isFieldValid } from '../EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'
import type { InputValuesType } from '../EditView.types'
import type { WebContentType } from '@/types'

export const useEditView = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()
  const { push: routerPush } = useRouter()

  const jobPosition = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined
  })

  const aboutDesc = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined
  })

  watchEffect(() => {
    jobPosition.value = webContent.value.header.jobPosition
    aboutDesc.value = webContent.value.about.description
  })

  onUpdated(() => {
    isFieldValid(
      jobPosition,
      originalWebContent.value.header.jobPosition,
      appStateStore.hasLocalChanges
    )
    isFieldValid(
      aboutDesc,
      originalWebContent.value.about.description,
      appStateStore.hasLocalChanges
    )
  })

  watch(jobPosition, () => {
    checkIsFieldValid(
      jobPosition,
      originalWebContent.value.header.jobPosition,
      40,
      appStateStore.hasLocalChanges
    )
  })

  watch(aboutDesc, () => {
    checkIsFieldValid(
      aboutDesc,
      originalWebContent.value.about.description,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  const formState = computed(() => {
    const formFields = shallowReactive([jobPosition, aboutDesc])
    const hasErrors = formFields.some((field) => field.error)
    const isValid = formFields.some((field) => field.isValid)

    return {
      hasErrors,
      isValid: isValid && !hasErrors
    }
  })

  const submitForm = () => {
    if (!formState.value.isValid) {
      return
    }

    const formData: WebContentType = {
      ...originalWebContent.value,
      header: {
        ...originalWebContent.value.header,
        jobPosition: jobPosition.value!
      },
      about: {
        ...originalWebContent.value.about,
        description: aboutDesc.value!
      }
    }

    webContentStore.changeWebContentLocally(formData)
    routerPush({
      name: 'home',
      replace: true
    })
  }

  return {
    formFields: {
      jobPosition,
      aboutDesc
    },
    formState,
    submitForm
  }
}
