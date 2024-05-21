<script setup lang="ts">
import { computed } from 'vue'
import type { RouterLinkProps } from 'vue-router'
import type { BaseTextSizeType, BaseTextVatiantType } from '../BaseText/BaseText.types'

import styles from './BaseLink.module.scss'

type Props = {
  to: RouterLinkProps['to']
  size?: BaseTextSizeType
  variant?: BaseTextVatiantType
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary'
})

const COLORS_MAP: Record<BaseTextVatiantType, string> = {
  primary: styles.primary,
  secondary: styles.secondary
}
const colorVariantClass = COLORS_MAP[props.variant]
const linkClasses = computed(() => {
  return [styles.link, styles[props.size], colorVariantClass]
})
</script>

<template>
  <RouterLink :class="linkClasses" :to="to"><slot></slot></RouterLink>
</template>
