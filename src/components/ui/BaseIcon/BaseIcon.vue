<script setup lang="ts">
import { openUrlInNewTab } from '@/helpers/general'

import styles from './BaseIcon.module.scss'

type Props = {
  src: string
  alt: string
  link?: string
}

defineProps<Props>()
</script>

<template>
  <div @click="openUrlInNewTab(link)" :class="[styles.wrapper, { [styles.clickable]: link }]">
    <img :src="src" :alt="alt" />
  </div>
</template>
