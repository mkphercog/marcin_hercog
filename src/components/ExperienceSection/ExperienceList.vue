<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ExperienceItem from './ExperienceItem.vue'
import { useTranslationsStore } from '@/store'

import styles from './Experience.module.scss'

const { translations } = storeToRefs(useTranslationsStore())
</script>

<template>
  <ul :class="styles.list">
    <ExperienceItem
      v-for="{ id, description } in translations.experience.experienceList"
      :key="id"
      :description="description"
    />
  </ul>
</template>
