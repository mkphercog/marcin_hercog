<script setup lang="ts">
import BaseText from '../BaseText/BaseText.vue'
import BaseDivider from '../BaseDivider/BaseDivider.vue'
type Props = { title: string; hideDivider?: boolean }

defineProps<Props>()
</script>

<template>
  <section>
    <BaseText as="header">{{ title }}</BaseText>
    <slot></slot>

    <BaseDivider v-if="!hideDivider" />
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
