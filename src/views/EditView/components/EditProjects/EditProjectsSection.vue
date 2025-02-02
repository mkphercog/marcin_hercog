<script setup lang="ts">
import { computed } from 'vue'
import { BaseSection } from '@/components/ui'
import EditProjectsSectionAddNew from './EditProjectsSectionAddNew.vue'
import type { ProjectInputType } from '../../types/EditView.types'
import { useWebContentStore } from '@/store'
import EditProjectsSectionList from './EditProjectsSectionList.vue'

const webContentStore = useWebContentStore()

type Props = {
  projects: ProjectInputType[]
}

const props = defineProps<Props>()

const projectsList = computed(() => props.projects)
</script>

<template>
  <BaseSection
    :title="webContentStore.webContent.staticEditMode.projectsTitle"
    header-position="left"
  >
    <EditProjectsSectionAddNew />
    <EditProjectsSectionList :projects="projectsList" />
  </BaseSection>
</template>
