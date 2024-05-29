import type { CodingSkillInputType } from '../../types/EditView.types'

export const clearNewSkillFields = (newSkill: CodingSkillInputType) => {
  newSkill.label = {
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  }

  newSkill.scaleValue = {
    value: undefined,
    error: null,
    isValid: undefined,
    hasChanges: false
  }
}
