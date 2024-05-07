<script setup lang="ts">
import ProgrammingItem from './ProgrammingItem.vue'
import { PROGRAMMING_SKILLS } from '@/constants'
</script>

<template>
  <ul>
    <ProgrammingItem
      v-for="{ id, label, scaleValue } in PROGRAMMING_SKILLS"
      :key="id"
      :label="label"
      :scaleValue="scaleValue"
    />
  </ul>
</template>
