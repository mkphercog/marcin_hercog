<script setup lang="ts">
import BaseText from '../BaseText/BaseText.vue'
import BaseDivider from '../BaseDivider/BaseDivider.vue'

import styles from './BaseSection.module.scss'

type Props = { title?: string; hideDivider?: boolean; headerPosition?: 'center' | 'left' }

const props = withDefaults(defineProps<Props>(), {
  headerPosition: 'center'
})

const isPosLeft = props.headerPosition === 'left'
</script>

<template>
  <section :class="[styles.wrapper, { [styles.wrapperLeft]: isPosLeft }]">
    <BaseText :class="styles.header" as="h3">
      {{ title }}
    </BaseText>
    <slot></slot>

    <BaseDivider v-if="!hideDivider" />
  </section>
</template>
