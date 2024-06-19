<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
import { BaseText } from '@/components/ui'

import styles from './BaseInput.module.scss'

type Props = {
  name: string
  label: string
  isValid?: boolean
  hasChanges?: boolean
  errorMessage?: string | null
  restProps?: InputHTMLAttributes
  maxLength?: number
}

const model = defineModel<string | number>()

withDefaults(defineProps<Props>(), {
  isValid: undefined,
  errorMessage: null
})
</script>

<template>
  <div :class="styles.wrapper">
    <label :class="styles.label" :for="name">
      <BaseText size="sm">
        {{ label }}
      </BaseText>
      <BaseText v-if="maxLength" size="sm">
        {{ model?.toString().length || 0 }}/{{ maxLength }}
      </BaseText>
    </label>
    <input
      :id="name"
      v-model.trim="model"
      v-bind="restProps"
      :class="[
        styles.input,
        {
          [styles.error]: !!errorMessage,
          [styles.changes]: isValid || hasChanges
        }
      ]"
    />
    <BaseText v-if="!!errorMessage" :class="styles.errorMessage" size="sm">
      {{ errorMessage }}
    </BaseText>
  </div>
</template>
