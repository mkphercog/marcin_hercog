<script setup lang="ts">
import { computed } from 'vue'
import type { BaseTextProps, BaseTextVatiantType } from './BaseText.types'

import styles from './BaseText.module.scss'

const props = withDefaults(defineProps<BaseTextProps>(), {
  as: 'p',
  variant: 'primary',
  size: 'md',
  justify: false
})

const COLORS_MAP: Record<BaseTextVatiantType, string> = {
  primary: styles.primary,
  secondary: styles.secondary
}
const colorVariantClass = COLORS_MAP[props.variant]

const isH1 = computed(() => props.as === 'h1')
const isH3 = computed(() => props.as === 'h3')
const isPara = computed(() => props.as === 'p')

const h1Classes = computed(() => [styles.h1, styles[props.size], colorVariantClass])
const h3Classes = computed(() => [styles.h3, styles[props.size], colorVariantClass])
const paraClasses = computed(() => {
  return [
    styles.p,
    styles[props.size],
    {
      [styles.justify]: props.justify
    },
    colorVariantClass
  ]
})
</script>

<template>
  <h1 v-if="isH1" :class="h1Classes">
    <slot></slot>
  </h1>

  <h3 v-else-if="isH3" :class="h3Classes">
    <slot></slot>
  </h3>

  <p v-else-if="isPara" :class="paraClasses">
    <slot></slot>
  </p>
</template>
