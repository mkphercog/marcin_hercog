<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { BaseText } from '@/components/ui'

import styles from './BaseInput.module.scss'

type Props = {
  name: string
  label: string
  isValid?: boolean | undefined
  errorMessage?: string | null
  restProps?: InputHTMLAttributes
}

const model = defineModel()

withDefaults(defineProps<Props>(), {
  isValid: undefined,
  errorMessage: null
})
</script>

<template>
  <div :class="styles.wrapper">
    <label :class="styles.label" :for="name">
      <BaseText size="sm">{{ label }}</BaseText>
    </label>
    <input
      :id="name"
      v-model.trim="model"
      v-bind="restProps"
      :class="[
        styles.input,
        {
          [styles.error]: !!errorMessage,
          [styles.changes]: isValid
        }
      ]"
    />
    <BaseText v-if="!!errorMessage" :class="styles.errorMessage" size="sm">
      {{ errorMessage }}
    </BaseText>
  </div>
</template>
