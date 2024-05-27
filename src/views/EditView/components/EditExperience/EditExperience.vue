<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import EditExperienceList from './EditExperienceList/EditExperienceList.vue'
import EditExperienceAddNew from './EditExperienceAddNew/EditExperienceAddNew.vue'

import styles from './EditExperience.module.scss'

type Props = {
  experienceDescription: InputValuesType
  experienceListItems: InputValuesType[]
}

const props = defineProps<Props>()
const experienceDesc = reactive(props.experienceDescription)
</script>

<template>
  <BaseText as="h3">Experience section</BaseText>
  <BaseCard>
    <BaseCard :class="styles.containter">
      <BaseTextarea
        name="experienceDesc"
        label="experience.description"
        :has-changes="experienceDesc.hasChanges && !experienceDesc.error"
        :error-message="experienceDesc.error"
        v-model="experienceDesc.value"
      />
    </BaseCard>

    <EditExperienceAddNew />
    <EditExperienceList :list-items="experienceListItems" />
  </BaseCard>
</template>
