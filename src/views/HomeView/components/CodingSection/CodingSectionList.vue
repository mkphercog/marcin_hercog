<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CodingSectionItem from './CodingSectionItem.vue'
import { useWebContentStore } from '@/store'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <ul>
    <CodingSectionItem
      v-for="{ id, label, scaleValue } in webContent.programmingSkills.skillsList"
      :key="id"
      :label="label"
      :scale-value="scaleValue"
    />
  </ul>
</template>
