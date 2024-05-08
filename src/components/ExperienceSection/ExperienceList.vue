<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ExperienceItem from './ExperienceItem.vue'
import { useTranslationsStore } from '@/stores'

const { experienceContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <ul>
    <ExperienceItem
      v-for="{ id, description } in experienceContent.experienceList"
      :key="id"
      :description="description"
    />
  </ul>
</template>
