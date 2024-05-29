<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import EditExperienceAddNew from './EditExperienceAddNew.vue'
import EditExperienceList from './EditExperienceList.vue'
import { useWebContentStore } from '@/store'

import styles from './EditExperience.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  experienceDescription: InputValuesType
  experienceListItems: InputValuesType[]
}

const props = defineProps<Props>()
const experienceDesc = reactive(props.experienceDescription)
</script>

<template>
  <BaseText as="h3">
    {{ webContentStore.webContent.editMode.experienceSectionTitle }}
  </BaseText>
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
