<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseInput, BaseSection } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'
import { JOB_POSITION_MAX_LENGTH } from '@/constants'

import sharedStyles from '../EditSharedStyles.module.scss'

const webContentStore = useWebContentStore()

type Props = {
  jobPosition: InputValuesType
}

const props = defineProps<Props>()
const jobPosition = reactive(props.jobPosition)
</script>

<template>
  <BaseSection
    :title="webContentStore.webContent.staticEditMode.jobPositionTitle"
    header-position="left"
  >
    <BaseCard :class="sharedStyles.editCardItem">
      <BaseInput
        name="jobPosition"
        label="header.jobPosition"
        :has-changes="jobPosition.hasChanges && !jobPosition.error"
        :error-message="jobPosition.error"
        v-model="jobPosition.value"
        :max-length="JOB_POSITION_MAX_LENGTH"
      />
    </BaseCard>
  </BaseSection>
</template>
