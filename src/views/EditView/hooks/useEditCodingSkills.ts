import { computed, reactive, watch } from 'vue'
import type { ProgrammingSkillInputType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkCodingSkillField, createFormProgrammingSkill } from '../utils/EditView.helpers'

export const useEditCodingSkills = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const formCodingSkillsList = reactive<ProgrammingSkillInputType[]>([])

  const webProgrammingSkills = computed(
    () => webContentStore.webContent.programmingSkills.skillsList
  )
  watch(
    webProgrammingSkills,
    () => {
      formCodingSkillsList.splice(0, formCodingSkillsList.length)
      webProgrammingSkills.value.map((skill) => {
        formCodingSkillsList.push(createFormProgrammingSkill(skill))
      })
    },
    { immediate: true }
  )

  watch(formCodingSkillsList, () => {
    formCodingSkillsList.forEach((skill) => {
      const originalContent = webContentStore.originalWebContent.programmingSkills.skillsList.find(
        (originalSkill) => skill.id === originalSkill.id
      )

      checkCodingSkillField(skill, originalContent, 50, appStateStore.hasLocalChanges)
    })
  })

  return { formCodingSkillsList }
}