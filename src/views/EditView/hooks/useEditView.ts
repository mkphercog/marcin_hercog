import { computed, reactive, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  checkIsFieldValid,
  checkIsProgrammingSkillFieldValid,
  defineInputsRefs,
  isFieldValid,
  isProgrammingSkillFieldValid
} from '../utils/EditView.helpers'
import { useAppStateStore, useWebContentStore } from '@/store'
import type { ProgrammingSkillInputType } from '../types/EditView.types'
import type { ProgrammingSkillType, WebContentType } from '@/types'
import { RouteNamesEnum } from '@/routes'

export const useEditView = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()
  const route = useRoute()
  const { push: routerPush } = useRouter()

  const textInputs = defineInputsRefs([
    webContent.value.header.jobPosition,
    webContent.value.about.description,
    webContent.value.programmingSkills.additionalDescription
  ])
  const [jobPosition, aboutDesc, additionalProgrammingDesc] = textInputs

  const mappedProgrammingSkillsList = reactive<ProgrammingSkillInputType[]>([])

  watchEffect(() => {
    mappedProgrammingSkillsList.splice(0, mappedProgrammingSkillsList.length)

    webContent.value.programmingSkills.skillsList.map((skill) => {
      mappedProgrammingSkillsList.push({
        id: skill.id,
        label: {
          value: skill.label,
          error: null,
          isValid: undefined
        },
        scaleValue: {
          value: skill.scaleValue,
          error: null,
          isValid: undefined
        }
      })
    })

    mappedProgrammingSkillsList.forEach((skill) => {
      watch(skill, () => {
        const originalContent = originalWebContent.value.programmingSkills.skillsList.find(
          (originalSkill) => skill.id === originalSkill.id
        )

        checkIsProgrammingSkillFieldValid(skill, originalContent, 50, appStateStore.hasLocalChanges)
      })
    })
  })

  const hasLocalChangesRef = computed(() => appStateStore.hasLocalChanges)
  const currentLanguageRef = computed(() => appStateStore.currentLanguage)
  watch([hasLocalChangesRef, currentLanguageRef], () => {
    if (!appStateStore.hasLocalChanges) {
      jobPosition.value = originalWebContent.value.header.jobPosition
      aboutDesc.value = originalWebContent.value.about.description
      additionalProgrammingDesc.value =
        originalWebContent.value.programmingSkills.additionalDescription

      mappedProgrammingSkillsList.forEach((skill) => {
        const originalContent = originalWebContent.value.programmingSkills.skillsList.find(
          (originalSkill) => skill.id === originalSkill.id
        )

        skill.label.value = originalContent?.label || ''
        skill.scaleValue.value = originalContent?.scaleValue || 0
      })
    }
  })

  const skillListRef = computed(() => webContent.value.programmingSkills.skillsList)
  watch([route, skillListRef], () => {
    if (route.name === RouteNamesEnum.EDIT_MODE && appStateStore.hasLocalChanges) {
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

      isFieldValid(
        additionalProgrammingDesc,
        originalWebContent.value.programmingSkills.additionalDescription,
        appStateStore.hasLocalChanges
      )

      mappedProgrammingSkillsList.forEach((skill) => {
        const originalContent = originalWebContent.value.programmingSkills.skillsList.find(
          (originalSkill) => skill.id === originalSkill.id
        )

        isProgrammingSkillFieldValid(skill, originalContent, appStateStore.hasLocalChanges)
      })
    }
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
    const hasErrors = textInputs.some((field) => field.error)
    const isValid = textInputs.some((field) => !!field.isValid)
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
