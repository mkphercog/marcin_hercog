<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseButton, BaseSection, BaseText } from '@/components/ui'
import ExperienceList from './ExperienceList.vue'
import { useTranslationsStore } from '@/store'

import styles from './Experience.module.scss'

const store = useTranslationsStore()
const { translations } = storeToRefs(store)
const { downloadCVFile } = store
</script>

<template>
  <BaseSection :title="translations?.experience.header">
    <div :class="styles.contentWrapper">
      <BaseText justify>{{ translations?.experience.description }}</BaseText>
      <ExperienceList />

      <BaseButton
        @click="downloadCVFile"
        :class="styles.downloadBtn"
        variant="secondary"
        size="lg"
        >{{ translations?.experience.downloadBtn }}</BaseButton
      >
    </div>
  </BaseSection>
</template>
