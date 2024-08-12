import type { ProjectsListItemType } from '@/types'
import type { ProjectInputType } from '../../types/EditView.types'
import { DEFAULT_WEB_CONTENT } from '@/constants'

export const clearNewProjectFields = (newProject: ProjectInputType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...newProjectFields } = newProject

  Object.values(newProjectFields).forEach((field) => {
    field.value = undefined
    field.error = null
    field.isValid = undefined
    field.hasChanges = false
  })
}

export const createProjectFields = (project?: ProjectsListItemType) => {
  const fields = {} as Omit<ProjectInputType, 'id'>

  if (project) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...projectDetails } = project
    Object.entries(projectDetails).forEach(([key, value]) => {
      Object.assign(fields, {
        [key]: {
          value,
          error: null,
          isValid: undefined,
          hasChanges: false
        }
      })
    })
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...projectDetails } = DEFAULT_WEB_CONTENT.editable.projectsSectionList[0]
    Object.keys(projectDetails).forEach((key) => {
      Object.assign(fields, {
        [key]: {
          value: undefined,
          error: null,
          isValid: undefined,
          hasChanges: false
        }
      })
    })
  }

  return { id: project?.id || new Date().getTime().toString(), ...fields }
}
