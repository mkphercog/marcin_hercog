<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseButton, BaseSection, BaseText } from '@/components/ui'
import DownloadPdfIcon from '@/assets/icons/DownloadPdfIcon.vue'
import ExperienceList from './ExperienceList.vue'
import { useWebContentStore } from '@/store'

import styles from './Experience.module.scss'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)
</script>

<template>
  <BaseSection :title="webContent.experience.header">
    <div :class="styles.contentWrapper">
      <BaseText justify>
        {{ webContent.experience.description }}
      </BaseText>
      <ExperienceList />

      <BaseButton
        @click="webContentStore.downloadCVFile"
        :class="styles.downloadBtn"
        variant="secondary"
        size="lg"
      >
        <div :class="styles.pdfBtnContainer">
          {{ webContent.experience.downloadBtn }}
          <DownloadPdfIcon :class="styles.pdfIcon" />
        </div>
      </BaseButton>
    </div>
  </BaseSection>
</template>
