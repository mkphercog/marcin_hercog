<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseButton, BaseSection, BaseText } from '@/components/ui'
import DownloadPdfIcon from '@/assets/icons/DownloadPdfIcon.vue'
import ExperienceList from './ExperienceList.vue'
import { useTranslationsStore } from '@/store'

import styles from './Experience.module.scss'

const store = useTranslationsStore()
const { translations } = storeToRefs(store)
const { downloadCVFile } = store
</script>

<template>
  <BaseSection :title="translations.experience.header">
    <div :class="styles.contentWrapper">
      <BaseText justify>{{ translations.experience.description }}</BaseText>
      <ExperienceList />

      <BaseButton @click="downloadCVFile" :class="styles.downloadBtn" variant="secondary" size="lg">
        <div :class="styles.pdfBtnContainer">
          {{ translations.experience.downloadBtn }}
          <DownloadPdfIcon :class="styles.pdfIcon" />
        </div>
      </BaseButton>
    </div>
  </BaseSection>
</template>
