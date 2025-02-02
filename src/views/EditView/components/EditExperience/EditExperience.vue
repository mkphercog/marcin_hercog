<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseSection, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import EditExperienceAddNew from './EditExperienceAddNew.vue'
import EditExperienceList from './EditExperienceList.vue'
import { useWebContentStore } from '@/store'
import { EXP_DESC_MAX_LENGTH } from '@/constants'

import sharedStyles from '../EditSharedStyles.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  experienceDescription: InputValuesType
  experienceListItems: InputValuesType[]
}

const props = defineProps<Props>()
const experienceDesc = reactive(props.experienceDescription)
</script>

<template>
  <BaseSection
    :title="webContentStore.webContent.staticEditMode.experienceTitle"
    header-position="left"
  >
    <EditExperienceAddNew />
    <EditExperienceList :list-items="experienceListItems" />

    <BaseCard :class="sharedStyles.editContainter">
      <BaseTextarea
        name="experienceDesc"
        label="experience.description"
        :has-changes="experienceDesc.hasChanges && !experienceDesc.error"
        :error-message="experienceDesc.error"
        v-model="experienceDesc.value"
        :max-length="EXP_DESC_MAX_LENGTH"
      />
    </BaseCard>
  </BaseSection>
</template>
