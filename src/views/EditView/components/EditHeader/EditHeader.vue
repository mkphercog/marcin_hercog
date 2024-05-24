<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseInput, BaseText } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'

type Props = {
  jobPosition: InputValuesType
}

const props = defineProps<Props>()
const jobPosition = reactive(props.jobPosition)
</script>

<template>
  <BaseCard>
    <BaseText as="h3">Header</BaseText>
    <BaseInput
      name="jobPosition"
      label="header.jobPosition"
      :is-valid="jobPosition.isValid && !jobPosition.error"
      :error-message="jobPosition.error"
      v-model="jobPosition.value"
    />
  </BaseCard>
</template>
