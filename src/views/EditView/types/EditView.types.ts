export type InputValuesType = {
  id?: string
  value: string | undefined
  error: string | null
  isValid: boolean | undefined
  hasChanges: boolean
}

export type ProgrammingSkillInputType = {
  id: string
  label: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  scaleValue: {
    value: number | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
}
