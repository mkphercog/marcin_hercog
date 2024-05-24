<script setup lang="ts">
import { reactive } from 'vue'
import { BaseCard, BaseText, BaseTextarea } from '@/components/ui'
import type { InputValuesType } from '../../types/EditView.types'

type Props = {
  aboutDesc: InputValuesType
}

const props = defineProps<Props>()
const aboutDesc = reactive(props.aboutDesc)
</script>

<template>
  <BaseCard>
    <BaseText as="h3">About section</BaseText>
    <BaseTextarea
      name="aboutDesc"
      label="about.description"
      :is-valid="aboutDesc.isValid && !aboutDesc.error"
      :error-message="aboutDesc.error"
      v-model="aboutDesc.value"
    />
  </BaseCard>
</template>
