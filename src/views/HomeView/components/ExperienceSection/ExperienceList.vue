<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ExperienceItem from './ExperienceItem.vue'
import { useWebContentStore } from '@/store'

import styles from './ExperienceSection.module.scss'

const { webContent } = storeToRefs(useWebContentStore())
</script>

<template>
  <ul :class="styles.list">
    <ExperienceItem
      v-for="{ id, description } in webContent.experience.experienceList"
      :key="id"
      :description="description"
    />
  </ul>
</template>
