import type { ProgrammingSkillInputType } from '../../types/EditView.types'

export const clearNewSkillFields = (newSkill: ProgrammingSkillInputType) => {
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
