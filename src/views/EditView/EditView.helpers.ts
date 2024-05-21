import type { InputValuesType } from './EditView.types'

export const checkIsFieldValid = (
  field: InputValuesType,
  originalTranslation: string,
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

  isFieldValid(field, originalTranslation, areLocalChanges)
}

export const isFieldValid = (
  field: InputValuesType,
  originalTranslation: string,
  areLocalChanges: boolean
) => {
  if (field.value !== originalTranslation) {
    field.isValid = true
  } else if (!areLocalChanges) {
    field.isValid = undefined
  }
}
