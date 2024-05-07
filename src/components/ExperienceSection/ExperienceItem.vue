<script setup lang="ts">
import { BaseText } from '@/components/ui'

type Props = {
  description: string
}

defineProps<Props>()
</script>

<template>
  <li>
    <div class="listIndicator"></div>
    <BaseText>{{ description }}</BaseText>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 10px;
  list-style: none;
}

.listIndicator {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  background-color: $primary-bg-color;
  transform: rotate(45deg);
}
</style>
