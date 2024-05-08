<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseText } from '@/components/ui'
import ExperienceList from './ExperienceList.vue'
import { useTranslationsStore } from '@/stores'

const { experienceContent } = storeToRefs(useTranslationsStore())
</script>

<template>
  <BaseSection :title="experienceContent.header">
    <BaseText justify>{{ experienceContent.description }}</BaseText>
    <ExperienceList />
  </BaseSection>
</template>
