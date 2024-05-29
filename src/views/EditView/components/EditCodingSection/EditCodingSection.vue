<script setup lang="ts">
import { computed, reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import EditCodingSectionAddNew from './EditCodingSectionAddNew.vue'
import EditCodingSectionList from './EditCodingSectionList.vue'
import type { InputValuesType, CodingSkillInputType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'

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
    {{ webContentStore.webContent.editMode.codingSectionTitle }}
  </BaseText>
  <BaseCard>
    <EditCodingSectionAddNew />
    <EditCodingSectionList :coding-skills="skills" />

    <BaseCard :class="styles.containter">
      <BaseTextarea
        name="codingAdditionalDesc"
        label="programmingSkills.additionalDescription"
        :has-changes="additionalInfo.hasChanges && !additionalInfo.error"
        :error-message="additionalInfo.error"
        v-model="additionalInfo.value"
      />
    </BaseCard>
  </BaseCard>
</template>
