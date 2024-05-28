<script setup lang="ts">
import { BaseText } from '@/components/ui'

import styles from './Experience.module.scss'

type Props = {
  description: string
}

defineProps<Props>()
</script>

<template>
  <li :class="styles.listItem">
    <div :class="styles.listIndicator" />
    <BaseText>
      {{ description }}
    </BaseText>
  </li>
</template>
