<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue'
import type { BaseTextSizeType } from '../BaseText/BaseText.types'
import BaseText from '../BaseText/BaseText.vue'

import styles from './BaseButton.module.scss'

type Props = {
  size?: BaseTextSizeType
  variant?: 'primary' | 'secondary' | 'green' | 'destructive'
  restProps?: ButtonHTMLAttributes
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
  disabled: false
})
</script>

<template>
  <button :class="[styles.button, styles[variant]]" v-bind="restProps">
    <BaseText :size="size" variant="secondary">
      <slot></slot>
    </BaseText>
  </button>
</template>
