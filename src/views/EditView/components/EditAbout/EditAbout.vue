<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../EditView.types'

type Props = {
  aboutDesc: InputValuesType
}

const props = defineProps<Props>()
const aboutDesc = reactive(props.aboutDesc)
</script>

<template>
  <BaseCard>
    <BaseTextarea
      name="aboutDesc"
      label="About >> Description"
      :is-valid="aboutDesc.isValid && !aboutDesc.error"
      :error-message="aboutDesc.error"
      v-model="aboutDesc.value"
    />
  </BaseCard>
</template>
