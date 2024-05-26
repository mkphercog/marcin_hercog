import type { ProgrammingSkillType } from '@/types'
import type { InputValuesType, ProgrammingSkillInputType } from '../types/EditView.types'

export const checkInputField = (
  field: InputValuesType,
  originalWebContent: string,
  maxLength: number,
  areLocalChanges: boolean
) => {
  if (!field.value?.length) {
    field.error = 'Pole nie może być puste.'
  } else if (field.value?.length > maxLength) {
    field.error = `Max ${maxLength} znaków.`
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
  const label = field.label
  if (!label.value?.length) {
    label.error = 'Pole nie może być puste.'
  } else if (label.value?.length > maxLength) {
    label.error = `Max ${maxLength} znaków.`
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
    scaleValue.error = 'Pole nie może być puste.'
  } else if (scaleValue.value < 0 || scaleValue.value > 100) {
    scaleValue.error = `Podana wartość wykracza poza zakres (0 - 100)`
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
