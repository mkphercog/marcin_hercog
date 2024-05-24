<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from 'vue'
import type { BaseTextSizeType } from '../BaseText/BaseText.types'
import BaseText from '../BaseText/BaseText.vue'

import styles from './BaseButton.module.scss'

type Props = {
  size?: BaseTextSizeType
  variant?: 'primary' | 'secondary'
  restProps?: ButtonHTMLAttributes
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
  disabled: false
})

const asSecondary = computed(() => props.variant === 'secondary')
</script>

<template>
  <button :class="[styles.button, { [styles.secondary]: asSecondary }]" v-bind="restProps">
    <BaseText :size="size" variant="secondary">
      <slot></slot>
    </BaseText>
  </button>
</template>
