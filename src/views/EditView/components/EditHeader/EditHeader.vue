<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseInput } from '@/components/ui'
import type { InputValuesType } from '../../EditView.types'

type Props = {
  jobPosition: InputValuesType
}

const props = defineProps<Props>()
const jobPosition = reactive(props.jobPosition)
</script>

<template>
  <BaseCard>
    <BaseInput
      name="jobPosition"
      label="Header >> jobPosition"
      :is-valid="jobPosition.isValid && !jobPosition.error"
      :error-message="jobPosition.error"
      v-model="jobPosition.value"
    />
  </BaseCard>
</template>
