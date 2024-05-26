<script setup lang="ts">
import { BaseText } from '@/components/ui'

import styles from './BaseTextarea.module.scss'
import { ref, watch, type TextareaHTMLAttributes } from 'vue'

type Props = {
  name: string
  label: string
  isValid?: boolean
  hasChanges?: boolean
  errorMessage?: string | null
  restProps?: TextareaHTMLAttributes
}

const textarea = ref<HTMLTextAreaElement | undefined>()

const model = defineModel<TextareaHTMLAttributes['value']>()

withDefaults(defineProps<Props>(), {
  isValid: undefined,
  errorMessage: null
})

watch(
  [model, textarea],
  () => {
    if (!textarea.value || !textarea.value.scrollHeight) return

    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight + 4}px`
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div :class="styles.wrapper">
    <label :class="styles.label" :for="name">
      <BaseText size="sm">{{ label }}</BaseText>
    </label>
    <textarea
      ref="textarea"
      :id="name"
      v-model.trim="model"
      v-bind="restProps"
      rows="5"
      :class="[
        styles.textarea,
        {
          [styles.error]: !!errorMessage,
          [styles.changes]: isValid || hasChanges
        }
      ]"
      restProps
    />
    <BaseText v-if="!!errorMessage" :class="styles.errorMessage" size="sm">
      {{ errorMessage }}
    </BaseText>
  </div>
</template>
