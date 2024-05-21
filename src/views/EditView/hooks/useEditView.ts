import { computed, onUpdated, reactive, shallowReactive, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { checkIsFieldValid, isFieldValid } from '../EditView.helpers'
import { useTranslationsStore, useAppStateStore } from '@/store'
import type { InputValuesType } from '../EditView.types'
import type { Translations } from '@/types'

export const useEditView = () => {
  const store = useTranslationsStore()
  const appStateStore = useAppStateStore()
  const { translations, originalTranslations } = storeToRefs(store)
  const { changeTranslationsLocally } = store
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
    jobPosition.value = translations.value.header.jobPosition
    aboutDesc.value = translations.value.about.description
  })

  onUpdated(() => {
    isFieldValid(
      jobPosition,
      originalTranslations.value.header.jobPosition,
      appStateStore.getHasLocalChanges
    )
    isFieldValid(
      aboutDesc,
      originalTranslations.value.about.description,
      appStateStore.getHasLocalChanges
    )
  })

  watch(jobPosition, () => {
    checkIsFieldValid(
      jobPosition,
      originalTranslations.value.header.jobPosition,
      40,
      appStateStore.getHasLocalChanges
    )
  })

  watch(aboutDesc, () => {
    checkIsFieldValid(
      aboutDesc,
      originalTranslations.value.about.description,
      1024,
      appStateStore.getHasLocalChanges
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

    const formData: Translations = {
      ...translations.value,
      header: {
        ...translations.value.header,
        jobPosition: jobPosition.value!
      },
      about: {
        ...translations.value.about,
        description: aboutDesc.value!
      }
    }

    changeTranslationsLocally(formData)
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
