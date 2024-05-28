<script setup lang="ts">
import { computed, reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import EditProgrammingAddNew from './EditProgrammingAddNew/EditProgrammingAddNew.vue'
import EditProgrammingList from './EditProgrammingList/EditProgrammingList.vue'
import type { InputValuesType, ProgrammingSkillInputType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'

import styles from './EditProgramming.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  programmingSkills: ProgrammingSkillInputType[]
  additionalProgrammingDesc: InputValuesType
}

const props = defineProps<Props>()

const additionalInfo = reactive(props.additionalProgrammingDesc)
const skills = computed(() => props.programmingSkills)
</script>

<template>
  <BaseText as="h3">
    {{ webContentStore.webContent.editMode.codingSectionTitle }}
  </BaseText>
  <BaseCard>
    <EditProgrammingAddNew />
    <EditProgrammingList :programming-skills="skills" />

    <BaseCard :class="styles.containter">
      <BaseTextarea
        name="programmingAdditionalDesc"
        label="programmingSkills.additionalDescription"
        :has-changes="additionalInfo.hasChanges && !additionalInfo.error"
        :error-message="additionalInfo.error"
        v-model="additionalInfo.value"
      />
    </BaseCard>
  </BaseCard>
</template>
