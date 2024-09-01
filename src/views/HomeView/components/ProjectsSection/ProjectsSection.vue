<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { BaseSection } from '@/components/ui'
import { useWebContentStore } from '@/store'
import ProjectsSectionItem from './ProjectsSectionItem.vue'
import type { ProjectsListItemType } from '@/types'

import styles from './ProjectsSection.module.scss'
import { computed } from 'vue'

const webContentStore = useWebContentStore()
const { webContent } = storeToRefs(webContentStore)

const sortByProjectOrder = (projectA: ProjectsListItemType, projectB: ProjectsListItemType) => {
  return Number(projectB.order) - Number(projectA.order)
}

const sortedProjectList = computed(() =>
  webContent.value.editable.projectsSectionList.slice(0).sort(sortByProjectOrder)
)

const currentYearString = new Date().getFullYear().toString()
</script>

<template>
  <BaseSection :title="webContent.staticHomeView.projectsTitle">
    <div :class="styles.wrapper">
      <ProjectsSectionItem
        v-for="(project, index) in sortedProjectList"
        :project="project"
        :is-new="index === 0 && project.projectYear.includes(currentYearString)"
        :key="project.id"
      />
    </div>
  </BaseSection>
</template>
