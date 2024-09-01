<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CodingSectionItem from './CodingSectionItem.vue'
import { useWebContentStore } from '@/store'

import styles from './CodingSection.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <ul :class="styles.list">
    <CodingSectionItem
      v-for="{ id, label, scaleValue } in webContent.editable.codingSectionList"
      :key="id"
      :label="label"
      :scale-value="scaleValue"
    />
  </ul>
</template>
