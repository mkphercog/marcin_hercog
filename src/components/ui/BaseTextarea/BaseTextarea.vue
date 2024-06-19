<script setup lang="ts">
import { ref, watch, type TextareaHTMLAttributes } from 'vue'
import { BaseText } from '@/components/ui'

import styles from './BaseTextarea.module.scss'

type Props = {
  name: string
  label: string
  isValid?: boolean
  hasChanges?: boolean
  errorMessage?: string | null
  restProps?: TextareaHTMLAttributes
  isResizable?: boolean
  maxLength?: number
}

const textarea = ref<HTMLTextAreaElement | undefined>()

const model = defineModel<string>()

withDefaults(defineProps<Props>(), {
  isValid: undefined,
  errorMessage: null,
  isResizable: false
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
      <BaseText size="sm">
        {{ label }}
      </BaseText>
      <BaseText v-if="maxLength" size="sm"> {{ model?.length || 0 }}/{{ maxLength }} </BaseText>
    </label>
    <textarea
      ref="textarea"
      :id="name"
      v-model.trim="model"
      v-bind="restProps"
      :class="[
        styles.textarea,
        {
          [styles.error]: !!errorMessage,
          [styles.changes]: isValid || hasChanges,
          [styles.noResizable]: !isResizable
        }
      ]"
      restProps
    />
    <BaseText v-if="!!errorMessage" :class="styles.errorMessage" size="sm">
      {{ errorMessage }}
    </BaseText>
  </div>
</template>
