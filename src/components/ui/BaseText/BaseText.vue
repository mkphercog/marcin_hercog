<script setup lang="ts">
import { computed } from 'vue'
import type { BaseTextProps, BaseTextVatiantType } from './BaseText.types'

import styles from './BaseText.module.scss'

const props = withDefaults(defineProps<BaseTextProps>(), {
  as: 'text',
  variant: 'primary'
})

const COLORS_MAP: Record<BaseTextVatiantType, string> = {
  primary: styles.primary,
  secondary: styles.secondary
}

const isMainHeader = computed(() => props.as === 'mainHeader')
const isHeader = computed(() => props.as === 'header')
const isText = computed(() => props.as === 'text' || props.as === 'smallText')
const isSmallText = computed(() => props.as === 'smallText')
const isLink = computed(() => props.as === 'link')

const colorVariantClass = COLORS_MAP[props.variant]
</script>

<template>
  <h1 v-if="isMainHeader" :class="[styles.mainHeader, colorVariantClass]">
    <slot></slot>
  </h1>
  <h3 v-else-if="isHeader" :class="[styles.header, colorVariantClass]"><slot></slot></h3>
  <p
    v-else-if="isText"
    :class="[
      styles.para,
      { [styles.smallText]: isSmallText, [styles.justify]: justify },
      colorVariantClass
    ]"
  >
    <slot></slot>
  </p>
  <a v-else-if="isLink" :href="link" :class="colorVariantClass"><slot></slot></a>
</template>
