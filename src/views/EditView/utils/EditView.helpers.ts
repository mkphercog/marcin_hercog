import type { InputValuesType, ProgrammingSkillInputType } from '../types/EditView.types'

export const checkIsFieldValid = (
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

  isFieldValid(field, originalWebContent, areLocalChanges)
}

export const isFieldValid = (
  field: InputValuesType,
  originalWebContent: string,
  areLocalChanges: boolean
) => {
  if (field.value !== originalWebContent) {
    field.isValid = true
  } else if (!areLocalChanges) {
    field.isValid = undefined
  }

  field.hasChanges = field.value !== originalWebContent
}

export const checkIsProgrammingSkillFieldValid = (
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

  const scaleValue = field.scaleValue
  if (!scaleValue.value && scaleValue.value !== 0) {
    scaleValue.error = 'Pole nie może być puste.'
  } else if (scaleValue.value < 0 || scaleValue.value > 100) {
    scaleValue.error = `Podana wartość wykracza poza zakres (0 - 100)`
  } else {
    scaleValue.error = null
  }

  isProgrammingSkillFieldValid(field, originalWebContent, areLocalChanges)
}

export const isProgrammingSkillFieldValid = (
  field: ProgrammingSkillInputType,
  originalWebContent:
    | {
        id: string
        label: string
        scaleValue: number
      }
    | undefined,
  areLocalChanges: boolean
) => {
  if (field.label.value !== originalWebContent?.label) {
    field.label.isValid = true
  } else if (!areLocalChanges) {
    field.label.isValid = undefined
  }

  if (field.scaleValue.value !== originalWebContent?.scaleValue) {
    field.scaleValue.isValid = true
  } else if (!areLocalChanges) {
    field.scaleValue.isValid = undefined
  }

  field.label.hasChanges = field.label.value !== originalWebContent?.label
  field.scaleValue.hasChanges = field.scaleValue.value !== originalWebContent?.scaleValue
}
