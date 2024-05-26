import { computed, shallowReactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { mapSkillsToDisplay } from '../utils/EditView.helpers'
import { useWebContentStore } from '@/store'
import type { WebContentType } from '@/types'
import { useEditJobPositionField } from './useEditJobPosition'
import { useEditAboutDescriptionField } from './useEditAboutDescription'
import { useEditCodingDescriptionField } from './useEditCodingDescription'
import { useEditCodingSkills } from './useEditCodingSkills'

export const useEditView = () => {
  const webContentStore = useWebContentStore()
  const { originalWebContent } = storeToRefs(webContentStore)
  const { push: routerPush } = useRouter()

  const { jobPosition } = useEditJobPositionField()
  const { aboutDescription } = useEditAboutDescriptionField()
  const { codingDescription } = useEditCodingDescriptionField()
  const { formCodingSkillsList } = useEditCodingSkills()

  const formState = computed(() => {
    const formFields = shallowReactive([jobPosition, aboutDescription, codingDescription])
    const hasFormError = formFields.some((field) => field.error)
    const isFormValid = formFields.some((field) => !!field.isValid)

    const haveSkillsError = formCodingSkillsList.some(
      (skill) => skill.label.error || skill.scaleValue.error
    )
    const areSkillsValid = formCodingSkillsList.some(
      (skill) => !!skill.label.isValid || !!skill.scaleValue.isValid
    )

    return {
      hasErrors: hasFormError || haveSkillsError,
      isValid: (isFormValid || areSkillsValid) && !hasFormError && !haveSkillsError
    }
  })

  const submitForm = () => {
    if (!formState.value.isValid && formState.value.hasErrors) {
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
        description: aboutDescription.value!
      },
      programmingSkills: {
        ...originalWebContent.value.programmingSkills,
        skillsList: mapSkillsToDisplay(formCodingSkillsList),
        additionalDescription: codingDescription.value!
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
      aboutDescription,
      formCodingSkillsList,
      codingDescription
    },
    formState,
    submitForm
  }
}
