<script setup lang="ts">
import BaseText from '../BaseText/BaseText.vue'
import BaseDivider from '../BaseDivider/BaseDivider.vue'

import styles from './BaseSection.module.scss'

type Props = { title?: string; hideDivider?: boolean }

defineProps<Props>()
</script>

<template>
  <section :class="styles.wrapper">
    <BaseText :class="styles.header" as="h3">
      {{ title }}
    </BaseText>
    <slot></slot>

    <BaseDivider v-if="!hideDivider" />
  </section>
</template>
