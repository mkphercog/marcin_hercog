<script setup lang="ts">
import { computed } from 'vue'
import { BaseText } from '@/components/ui'
import type { CodingSkillType } from '@/types'

import styles from './CodingSection.module.scss'

const props = defineProps<Omit<CodingSkillType, 'id'>>()

const scaleValueStyle = computed(() => ({
  width: `${props.scaleValue}%`
}))
</script>

<template>
  <li :class="styles.codingItem">
    <BaseText>
      {{ label }}
    </BaseText>
    <div :class="styles.scaleBg">
      <div :class="styles.scaleValue" :style="scaleValueStyle" />
    </div>
  </li>
</template>
