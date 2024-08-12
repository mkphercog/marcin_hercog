<script setup lang="ts">
import type { ProjectsListItemType } from '@/types'
import { BaseButton, BaseCard, BaseText } from '@/components/ui'
import { openUrlInNewTab } from '@/helpers/general'
import { useWebContentStore } from '@/store'
import { storeToRefs } from 'pinia'
import ProjectPlaceholder from '@/assets/img/ProjectImgPlaceholder.jpg'

import styles from './ProjectsSection.module.scss'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

type Props = {
  project: ProjectsListItemType
}

defineProps<Props>()

const handleImageError = (payload: Event) => {
  if (!payload.target) return
  const payloadElement = payload.target as HTMLImageElement
  payloadElement.src = ProjectPlaceholder
  payloadElement.alt = 'Project image placeholder'
}
</script>

<template>
  <BaseCard :class="styles.item">
    <img
      :class="styles.image"
      :src="project.imgLink"
      @error="handleImageError"
      alt="Project image"
    />
    <div :class="styles.hover">
      <div :class="styles.text">
        <BaseText size="lg">{{ project.title }}</BaseText>
        <BaseText size="sm">{{ project.techStack }}</BaseText>
      </div>
      <div :class="styles.actions">
        <BaseButton @click="openUrlInNewTab(project.liveLink)" variant="green"> Live </BaseButton>
        <BaseButton @click="openUrlInNewTab(project.sourceCodeLink)" variant="secondary">
          Github
        </BaseButton>
      </div>
      <BaseText size="xs" :class="styles.year"
        >{{ webContent.staticHomeView.projectDate }} {{ project.projectYear }}</BaseText
      >
    </div>
  </BaseCard>
</template>
