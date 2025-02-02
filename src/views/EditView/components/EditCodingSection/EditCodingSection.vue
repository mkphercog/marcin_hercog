<script setup lang="ts">
import { computed, reactive } from 'vue'
import { BaseCard, BaseSection, BaseTextarea } from '@/components/ui'
import EditCodingSectionAddNew from './EditCodingSectionAddNew.vue'
import EditCodingSectionList from './EditCodingSectionList.vue'
import type { InputValuesType, CodingSkillInputType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'
import { CODING_DESC_MAX_LENGTH } from '@/constants'

import sharedStyles from '../EditSharedStyles.module.scss'

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
  <BaseSection
    :title="webContentStore.webContent.staticEditMode.codingTitle"
    header-position="left"
  >
    <EditCodingSectionAddNew />
    <EditCodingSectionList :coding-skills="skills" />

    <BaseCard :class="sharedStyles.editContainter">
      <BaseTextarea
        name="codingAdditionalDesc"
        label="codingSkills.additionalDescription"
        :has-changes="additionalInfo.hasChanges && !additionalInfo.error"
        :error-message="additionalInfo.error"
        v-model="additionalInfo.value"
        :max-length="CODING_DESC_MAX_LENGTH"
      />
    </BaseCard>
  </BaseSection>
</template>
