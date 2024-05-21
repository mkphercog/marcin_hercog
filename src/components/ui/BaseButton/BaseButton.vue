<script setup lang="ts">
import { computed } from 'vue'
import BaseText from '../BaseText/BaseText.vue'

import styles from './BaseButton.module.scss'
import type { BaseTextSizeType } from '../BaseText/BaseText.types'

type Props = {
  size?: BaseTextSizeType
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
  disabled: false
})

const asSecondary = computed(() => props.variant === 'secondary')
</script>

<template>
  <button :class="[styles.button, { [styles.secondary]: asSecondary }]" :disabled="disabled">
    <BaseText :size="size" variant="secondary">
      <slot></slot>
    </BaseText>
  </button>
</template>
