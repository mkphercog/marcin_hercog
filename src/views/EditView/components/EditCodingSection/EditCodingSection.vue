<script setup lang="ts">
import { computed, reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import EditCodingSectionAddNew from './EditCodingSectionAddNew.vue'
import EditCodingSectionList from './EditCodingSectionList.vue'
import type { InputValuesType, CodingSkillInputType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'
import { CODING_DESC_MAX_LENGTH } from '@/constants'

import styles from './EditCodingSection.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  codingSkills: CodingSkillInputType[]
  additionalCodingDesc: InputValuesType
}

const props = defineProps<Props>()

const additionalInfo = reactive(props.additionalCodingDesc)
const skills = computed(() => props.codingSkills)
</script>

<template>
  <BaseText as="h3">
    {{ webContentStore.webContent.staticEditMode.codingTitle }}
  </BaseText>
  <BaseCard>
    <EditCodingSectionAddNew />
    <EditCodingSectionList :coding-skills="skills" />

    <BaseCard :class="styles.containter">
      <BaseTextarea
        name="codingAdditionalDesc"
        label="codingSkills.additionalDescription"
        :has-changes="additionalInfo.hasChanges && !additionalInfo.error"
        :error-message="additionalInfo.error"
        v-model="additionalInfo.value"
        :max-length="CODING_DESC_MAX_LENGTH"
      />
    </BaseCard>
  </BaseCard>
</template>
