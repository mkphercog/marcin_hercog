export type ProgrammingSkillType = {
  id: string
  label: string
  scaleValue: number
}

export type ExperienceItemType = {
  header: string
  description: string
  experienceList: { id: string; description: string }[]
}

export type IconType = {
  id: string
  icon: string
  link?: string
  name: string
}
