export type InputValuesType = {
  id?: string
  value: string | undefined
  error: string | null
  isValid: boolean | undefined
  hasChanges: boolean
}

export type CodingSkillInputType = {
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

export type ProjectInputType = {
  id: string | undefined
  order: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  title: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  techStack: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  liveLink: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  sourceCodeLink: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  imgLink: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
  projectYear: {
    value: string | undefined
    error: string | null
    isValid: boolean | undefined
    hasChanges: boolean
  }
}
