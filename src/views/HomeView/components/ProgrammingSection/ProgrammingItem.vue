<script setup lang="ts">
import { computed } from 'vue'
import { BaseText } from '@/components/ui'
import type { ProgrammingSkillType } from '@/types'

import styles from './Programming.module.scss'

const props = defineProps<Omit<ProgrammingSkillType, 'id'>>()

const scaleValueStyle = computed(() => ({
  width: `${props.scaleValue}%`
}))
</script>

<template>
  <li :class="styles.programmingItem">
    <BaseText>{{ label }} </BaseText>
    <div :class="styles.scaleBg">
      <div :class="styles.scaleValue" :style="scaleValueStyle"></div>
    </div>
  </li>
</template>
