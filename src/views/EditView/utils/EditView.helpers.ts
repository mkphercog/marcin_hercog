import type { CodingSkillType, ExperienceListItemType, ProjectsListItemType } from '@/types'
import type {
  InputValuesType,
  CodingSkillInputType,
  ProjectInputType
} from '../types/EditView.types'
import { useWebContentStore } from '@/store'
import isEqual from 'lodash.isequal'

export const checkInputField = (
  field: InputValuesType,
  originalWebContent: string,
  maxLength: number,
  areLocalChanges: boolean
) => {
  const webContentStore = useWebContentStore()

  if (!field.value?.length) {
    field.error = webContentStore.webContent.staticErrors.emptyField
  } else if (field.value?.length > maxLength) {
    field.error = `${webContentStore.webContent.staticErrors.maxLength} ${maxLength}`
  } else {
    field.error = null
  }

  if (!isEqual(field.value, originalWebContent)) {
    field.isValid = true
  } else if (!areLocalChanges) {
    field.isValid = undefined
  }
  field.hasChanges = field.value !== originalWebContent
}

export const checkCodingSkillField = (
  field: CodingSkillInputType,
  originalWebContent: CodingSkillType | undefined,
  maxLength: number,
  areLocalChanges: boolean
) => {
  const webContentStore = useWebContentStore()
  const label = field.label
  if (!label.value?.length) {
    label.error = webContentStore.webContent.staticErrors.emptyField
  } else if (label.value?.length > maxLength) {
    label.error = `${webContentStore.webContent.staticErrors.maxLength} ${maxLength}`
  } else {
    label.error = null
  }

  if (label.value !== originalWebContent?.label) {
    label.isValid = true
  } else if (!areLocalChanges) {
    label.isValid = undefined
  }
  label.hasChanges = label.value !== originalWebContent?.label

  const scaleValue = field.scaleValue
  if (!scaleValue.value && scaleValue.value !== 0) {
    scaleValue.error = webContentStore.webContent.staticErrors.emptyField
  } else if (scaleValue.value < 0 || scaleValue.value > 100) {
    scaleValue.error = webContentStore.webContent.staticErrors.exceededRange
  } else {
    scaleValue.error = null
  }

  if (scaleValue.value !== originalWebContent?.scaleValue) {
    scaleValue.isValid = true
  } else if (!areLocalChanges) {
    scaleValue.isValid = undefined
  }
  scaleValue.hasChanges = scaleValue.value !== originalWebContent?.scaleValue
}

export const createFormCodingSkill = (skill: CodingSkillType): CodingSkillInputType => {
  return {
    id: skill.id,
    label: {
      value: skill.label,
      error: null,
      isValid: undefined,
      hasChanges: false
    },
    scaleValue: {
      value: skill.scaleValue,
      error: null,
      isValid: undefined,
      hasChanges: false
    }
  }
}

export const mapSkillsToDisplay = (mappedSkills: CodingSkillInputType[]): CodingSkillType[] => {
  return mappedSkills.map((skill) => ({
    id: skill.id,
    label: skill.label.value || '',
    scaleValue: Number(skill.scaleValue.value)
  }))
}

export const mapExperienceListToDisplay = (
  experienceItems: InputValuesType[]
): ExperienceListItemType[] => {
  return experienceItems.map((item) => ({
    id: item.id || '',
    description: item.value || ''
  }))
}

export const checkProjectFields = (
  fields: ProjectInputType,
  originalWebContent: ProjectsListItemType | undefined,
  maxLength: number,
  areLocalChanges: boolean
) => {
  const webContentStore = useWebContentStore()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...restFields } = fields

  Object.entries(restFields).forEach(([key, field]) => {
    if (!field.value?.length) {
      field.error = webContentStore.webContent.staticErrors.emptyField
    } else if (field.value.length > maxLength) {
      field.error = `${webContentStore.webContent.staticErrors.maxLength} ${maxLength}`
    } else {
      field.error = null
    }

    field.hasChanges = field.value !== originalWebContent?.[key as keyof ProjectInputType]

    if (field.value !== originalWebContent?.[key as keyof ProjectInputType]) {
      field.isValid = true
    } else if (!areLocalChanges) {
      field.isValid = undefined
    }
  })
}

export const mapProjectsToDisplay = (
  mappedProjects: ProjectInputType[]
): ProjectsListItemType[] => {
  return mappedProjects.map((project) => ({
    id: project.id || '',
    order: project.order.value || '',
    title: project.title.value || '',
    techStack: project.techStack.value || '',
    liveLink: project.liveLink.value || '',
    sourceCodeLink: project.sourceCodeLink.value || '',
    imgLink: project.imgLink.value || '',
    projectYear: project.projectYear.value || ''
  }))
}
