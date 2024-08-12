import { computed, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { CodingSkillInputType } from '../types/EditView.types'
import { useAppStateStore, useWebContentStore } from '@/store'
import { checkCodingSkillField, createFormCodingSkill } from '../utils/EditView.helpers'
import { CODING_LABEL_MAX_LENGTH } from '@/constants'

export const useEditCodingSkills = () => {
  const webContentStore = useWebContentStore()
  const { webContent, originalWebContent } = storeToRefs(webContentStore)
  const appStateStore = useAppStateStore()

  const formCodingSkillsList = reactive<CodingSkillInputType[]>([])
  const webCodingSkills = computed(() => webContent.value.editable.codingSectionList)

  watch(
    webCodingSkills,
    () => {
      //I need to clear formCodingSkillsList here before I generate new list
      //without it i'm doubling fields
      formCodingSkillsList.splice(0, formCodingSkillsList.length)
      webCodingSkills.value.map((skill) => {
        formCodingSkillsList.push(createFormCodingSkill(skill))
      })
    },
    { immediate: true }
  )

  watch(formCodingSkillsList, () => {
    formCodingSkillsList.forEach((skill) => {
      const originalContent = originalWebContent.value.editable.codingSectionList.find(
        (originalSkill) => skill.id === originalSkill.id
      )

      checkCodingSkillField(
        skill,
        originalContent,
        CODING_LABEL_MAX_LENGTH,
        appStateStore.hasLocalChanges
      )
    })
  })

  return { formCodingSkillsList }
}
