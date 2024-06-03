<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseInput, BaseText } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'

const webContentStore = useWebContentStore()

type Props = {
  jobPosition: InputValuesType
}

const props = defineProps<Props>()
const jobPosition = reactive(props.jobPosition)
</script>

<template>
  <BaseText as="h3">
    {{ webContentStore.webContent.staticEditMode.jobPositionTitle }}
  </BaseText>
  <BaseCard>
    <BaseInput
      name="jobPosition"
      label="header.jobPosition"
      :has-changes="jobPosition.hasChanges && !jobPosition.error"
      :error-message="jobPosition.error"
      v-model="jobPosition.value"
    />
  </BaseCard>
</template>
