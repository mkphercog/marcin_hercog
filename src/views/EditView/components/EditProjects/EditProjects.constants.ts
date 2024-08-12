import type { ProjectsListItemType } from '@/types'

type ProjectFields = keyof Omit<ProjectsListItemType, 'id'>

export const PROJECT_FIELDS_NAMES: ProjectFields[] = [
  'order',
  'title',
  'projectYear',
  'techStack',
  'imgLink',
  'liveLink',
  'sourceCodeLink'
]
