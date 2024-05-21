import type { InputValuesType } from '../types/EditView.types'

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
}
