import type { InputValuesType } from '../../types/EditView.types'

export const clearNewExperienceItemField = (newExperienceItem: InputValuesType) => {
  newExperienceItem.value = undefined
  newExperienceItem.error = null
  newExperienceItem.hasChanges = false
  newExperienceItem.isValid = undefined
}
