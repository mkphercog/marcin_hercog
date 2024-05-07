<script setup lang="ts">
import { BaseSection, BaseText } from '@/components/ui'
import ExperienceList from './ExperienceList.vue'

import { EXPERIENCE } from '@/constants'
</script>

<template>
  <BaseSection :title="EXPERIENCE.header">
    <BaseText justify>{{ EXPERIENCE.description }}</BaseText>
    <ExperienceList />
  </BaseSection>
</template>
