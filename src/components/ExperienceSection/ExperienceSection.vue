<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection, BaseText } from '@/components/ui'
import ExperienceList from './ExperienceList.vue'
import { useTranslationsStore } from '@/store'

const { translations } = storeToRefs(useTranslationsStore())
</script>

<template>
  <BaseSection :title="translations?.experience.header">
    <BaseText justify>{{ translations?.experience.description }}</BaseText>
    <ExperienceList />
  </BaseSection>
</template>
