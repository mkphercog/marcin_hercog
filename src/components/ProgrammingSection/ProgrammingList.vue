<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProgrammingItem from './ProgrammingItem.vue'
import { useTranslationsStore } from '@/stores'

const { programmingContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <ul>
    <ProgrammingItem
      v-for="{ id, label, scaleValue } in programmingContent.skillsList"
      :key="id"
      :label="label"
      :scaleValue="scaleValue"
    />
  </ul>
</template>
