<script setup lang="ts">
import { computed } from 'vue'
import BaseText from '../BaseText/BaseText.vue'

import styles from './BaseButton.module.scss'
import type { TextAs } from '../BaseText/BaseText.types'

type Props = {
  type: 'big' | 'normal' | 'small'
  variant?: 'primary' | 'secondary'
}

const TEXT_SIZE_MAP: Record<Props['type'], TextAs> = {
  big: 'header',
  normal: 'text',
  small: 'smallText'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'normal',
  variant: 'primary'
})

const textSize = computed(() => TEXT_SIZE_MAP[props.type])
const asSecondary = computed(() => props.variant === 'secondary')
</script>

<template>
  <button :class="[styles.button, { [styles.secondary]: asSecondary }]">
    <BaseText :as="textSize" variant="secondary">
      <slot></slot>
    </BaseText>
  </button>
</template>
