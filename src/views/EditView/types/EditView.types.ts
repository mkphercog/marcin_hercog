export type InputValuesType = {
  value: string | undefined
  error: string | null
  isValid: boolean | undefined
}

export type ProgrammingSkillInputType = {
  id: string
  label: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
  }
  scaleValue: {
    value: number | undefined
    error: string | null
    isValid: boolean | undefined
  }
}
