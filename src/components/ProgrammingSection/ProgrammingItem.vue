<script setup lang="ts">
import { computed } from 'vue'
import { BaseText } from '@/components/ui'
import type { ProgrammingSkillType } from '@/constants'

const props = defineProps<Omit<ProgrammingSkillType, 'id'>>()

const scaleValueStyle = computed(() => ({
  width: `${props.scaleValue}%`
}))
</script>

<template>
  <li>
    <BaseText>{{ label }} </BaseText>
    <div class="scaleBg">
      <div class="scaleValue" :style="scaleValueStyle"></div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: baseline;
  justify-content: right;
  gap: 10px;
  margin-top: 10px;
  list-style: none;
}

.scaleBg {
  position: relative;
  width: 250px;
  height: 20px;
  background-color: $secondary-bg-color;

  @include for-tablet-lg-up {
    width: 400px;
  }
}

.scaleValue {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: $primary-bg-color;
}
</style>
