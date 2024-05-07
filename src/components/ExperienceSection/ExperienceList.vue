<script setup lang="ts">
import ExperienceItem from './ExperienceItem.vue'

import { EXPERIENCE } from '@/constants'
</script>

<template>
  <ul>
    <ExperienceItem
      v-for="{ id, description } in EXPERIENCE.experienceList"
      :key="id"
      :description="description"
    />
  </ul>
</template>
