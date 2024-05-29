import { computed, reactive, watch } from 'vue'
import type { CodingSkillInputType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkCodingSkillField, createFormCodingSkill } from '../utils/EditView.helpers'

export const useEditCodingSkills = () => {
  const webContentStore = useWebContentStore()
  const appStateStore = useAppStateStore()

  const formCodingSkillsList = reactive<CodingSkillInputType[]>([])

  const webCodingSkills = computed(() => webContentStore.webContent.programmingSkills.skillsList)
  watch(
    webCodingSkills,
    () => {
      formCodingSkillsList.splice(0, formCodingSkillsList.length)
      webCodingSkills.value.map((skill) => {
        formCodingSkillsList.push(createFormCodingSkill(skill))
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
