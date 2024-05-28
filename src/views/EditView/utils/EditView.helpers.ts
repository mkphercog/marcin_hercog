import type { ProgrammingSkillType } from '@/types'
import type { InputValuesType, ProgrammingSkillInputType } from '../types/EditView.types'
import { useWebContentStore } from '@/store'

export const checkInputField = (
  field: InputValuesType,
  originalWebContent: string,
  maxLength: number,
  areLocalChanges: boolean
) => {
  const webContentStore = useWebContentStore()

  if (!field.value?.length) {
    field.error = webContentStore.webContent.errors.emptyField
  } else if (field.value?.length > maxLength) {
    field.error = `${webContentStore.webContent.errors.maxLength} ${maxLength}`
  } else {
    field.error = null
  }

  if (field.value !== originalWebContent) {
    field.isValid = true
  } else if (!areLocalChanges) {
    field.isValid = undefined
  }
  field.hasChanges = field.value !== originalWebContent
}

export const checkCodingSkillField = (
  field: ProgrammingSkillInputType,
  originalWebContent:
    | {
        id: string
        label: string
        scaleValue: number
      }
    | undefined,
  maxLength: number,
  areLocalChanges: boolean
) => {
  const webContentStore = useWebContentStore()

  const label = field.label
  if (!label.value?.length) {
    label.error = webContentStore.webContent.errors.emptyField
  } else if (label.value?.length > maxLength) {
    label.error = `${webContentStore.webContent.errors.maxLength} ${maxLength}`
  } else {
    label.error = null
  }

  if (label.value !== originalWebContent?.label) {
    label.isValid = true
  } else if (!areLocalChanges) {
    label.isValid = undefined
  }
  label.hasChanges = label.value !== originalWebContent?.label

  const scaleValue = field.scaleValue
  if (!scaleValue.value && scaleValue.value !== 0) {
    scaleValue.error = webContentStore.webContent.errors.emptyField
  } else if (scaleValue.value < 0 || scaleValue.value > 100) {
    scaleValue.error = webContentStore.webContent.errors.exceededRange
  } else {
    scaleValue.error = null
  }

  if (scaleValue.value !== originalWebContent?.scaleValue) {
    scaleValue.isValid = true
  } else if (!areLocalChanges) {
    scaleValue.isValid = undefined
  }
  scaleValue.hasChanges = scaleValue.value !== originalWebContent?.scaleValue
}

export const createFormProgrammingSkill = (
  skill: ProgrammingSkillType
): ProgrammingSkillInputType => {
  return {
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
  }
}

export const mapSkillsToDisplay = (
  mappedSkills: ProgrammingSkillInputType[]
): ProgrammingSkillType[] => {
  return mappedSkills.map((skill) => ({
    id: skill.id,
    label: skill.label.value || '',
    scaleValue: Number(skill.scaleValue.value)
  }))
}
