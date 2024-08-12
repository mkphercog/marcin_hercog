import { computed, shallowReactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  mapExperienceListToDisplay,
  mapProjectsToDisplay,
  mapSkillsToDisplay
} from '../utils/EditView.helpers'
import { useWebContentStore } from '@/store'
import type { WebContentType } from '@/types'
import { useEditJobPositionField } from './useEditJobPosition'
import { useEditAboutDescriptionField } from './useEditAboutDescription'
import { useEditCodingSkills } from './useEditCodingSkills'
import { useEditCodingDescriptionField } from './useEditCodingDescription'
import { useEditExperienceDescription } from './useEditExperienceDescription'
import { useEditExperienceListItems } from './useEditExperienceListItems'
import { useEditProjectsList } from './useEditProjectsList'

export const useEditView = () => {
  const webContentStore = useWebContentStore()
  const { originalWebContent } = storeToRefs(webContentStore)
  const { push: routerPush } = useRouter()

  const { jobPosition } = useEditJobPositionField()
  const { aboutDescription } = useEditAboutDescriptionField()
  const { formCodingSkillsList } = useEditCodingSkills()
  const { codingDescription } = useEditCodingDescriptionField()
  const { experienceDescription } = useEditExperienceDescription()
  const { formExperienceListItems } = useEditExperienceListItems()
  const { formProjectsList } = useEditProjectsList()

  const formState = computed(() => {
    const formFields = shallowReactive([
      jobPosition,
      aboutDescription,
      codingDescription,
      experienceDescription,
      ...formExperienceListItems
    ])
    const hasFormError = formFields.some((field) => field.error)
    const isFormValid = formFields.some((field) => !!field.isValid)

    const haveSkillsError = formCodingSkillsList.some(
      (skill) => skill.label.error || skill.scaleValue.error
    )
    const areSkillsValid = formCodingSkillsList.some(
      (skill) => !!skill.label.isValid || !!skill.scaleValue.isValid
    )

    const haveProjectsError = formProjectsList.some((project) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...projectFields } = project
      return Object.values(projectFields).some((field) => field.error)
    })
    const areProjectsValid = formProjectsList.some((project) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...projectFields } = project
      return Object.values(projectFields).some((field) => !!field.isValid)
    })

    return {
      hasErrors: hasFormError || haveSkillsError || haveProjectsError,
      isValid:
        (isFormValid || areSkillsValid || areProjectsValid) &&
        !hasFormError &&
        !haveSkillsError &&
        !haveProjectsError
    }
  })

  const submitForm = () => {
    if (!formState.value.isValid && formState.value.hasErrors) {
      return
    }

    const formData: WebContentType = {
      ...originalWebContent.value,
      editable: {
        headerJobPosition: jobPosition.value!,
        aboutSectionDescription: aboutDescription.value!,
        codingSectionList: mapSkillsToDisplay(formCodingSkillsList),
        codingSectionDescription: codingDescription.value!,
        experienceSectionDescription: experienceDescription.value!,
        experienceSectionList: mapExperienceListToDisplay(formExperienceListItems),
        projectsSectionList: mapProjectsToDisplay(formProjectsList)
      }
    }

    webContentStore.changeWebContentLocally(formData)
    routerPush({
      name: 'home'
    })
  }

  return {
    formFields: {
      jobPosition,
      aboutDescription,
      formCodingSkillsList,
      codingDescription,
      experienceDescription,
      formExperienceListItems,
      formProjectsList
    },
    formState,
    submitForm
  }
}
