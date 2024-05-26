import { computed, reactive, shallowReactive, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { checkIsFieldValid, checkIsProgrammingSkillFieldValid } from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'
import type { InputValuesType, ProgrammingSkillInputType } from '../types/EditView.types'
import type { ProgrammingSkillType, WebContentType } from '@/types'

export const useEditView = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()
  const { push: routerPush } = useRouter()

  const jobPosition = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  const aboutDesc = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  const additionalProgrammingDesc = reactive<InputValuesType>({
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  })

  const mappedProgrammingSkillsList = reactive<ProgrammingSkillInputType[]>([])

  watchEffect(() => {
    jobPosition.value = webContent.value.header.jobPosition
    aboutDesc.value = webContent.value.about.description
    additionalProgrammingDesc.value = webContent.value.programmingSkills.additionalDescription
  })

  const webProgrammingSkills = computed(() => webContent.value.programmingSkills.skillsList)
  watch(
    webProgrammingSkills,
    () => {
      mappedProgrammingSkillsList.splice(0, mappedProgrammingSkillsList.length)
      webProgrammingSkills.value.map((skill) => {
        mappedProgrammingSkillsList.push({
          id: skill.id,
          label: {
            value: skill.label,
            error: null,
            isValid: undefined,
            hasChanges: false
          },
          scaleValue: {
            value: skill.scaleValue,
            error: null,
            isValid: undefined,
            hasChanges: false
          }
        })
      })
    },
    {
      immediate: true
    }
  )

  watch(mappedProgrammingSkillsList, () => {
    mappedProgrammingSkillsList.forEach((skill) => {
      const originalContent = originalWebContent.value.programmingSkills.skillsList.find(
        (originalSkill) => skill.id === originalSkill.id
      )

      checkIsProgrammingSkillFieldValid(skill, originalContent, 50, appStateStore.hasLocalChanges)
    })
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

  watch(additionalProgrammingDesc, () => {
    checkIsFieldValid(
      additionalProgrammingDesc,
      originalWebContent.value.programmingSkills.additionalDescription,
      1024,
      appStateStore.hasLocalChanges
    )
  })

  const mapSkillsToDisplay = (
    mappedSkills: ProgrammingSkillInputType[]
  ): ProgrammingSkillType[] => {
    return mappedSkills.map((skill) => ({
      id: skill.id,
      label: skill.label.value || '',
      scaleValue: Number(skill.scaleValue.value)
    }))
  }

  const formState = computed(() => {
    const formFields = shallowReactive([jobPosition, aboutDesc, additionalProgrammingDesc])
    const hasErrors = formFields.some((field) => field.error)
    const isValid = formFields.some((field) => !!field.isValid)
    const skillsError = mappedProgrammingSkillsList.some(
      (skill) => skill.label.error || skill.scaleValue.error
    )
    const skillsValid = mappedProgrammingSkillsList.some(
      (skill) => !!skill.label.isValid || !!skill.scaleValue.isValid
    )

    return {
      hasErrors: hasErrors || skillsError,
      isValid: (skillsValid || isValid) && !hasErrors && !skillsError
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
      },
      programmingSkills: {
        ...originalWebContent.value.programmingSkills,
        skillsList: mapSkillsToDisplay(mappedProgrammingSkillsList),
        additionalDescription: additionalProgrammingDesc.value!
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
      aboutDesc,
      mappedProgrammingSkillsList,
      additionalProgrammingDesc
    },
    formState,
    submitForm
  }
}
