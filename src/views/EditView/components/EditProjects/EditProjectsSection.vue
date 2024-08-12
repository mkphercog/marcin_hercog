<script setup lang="ts">
import { computed } from 'vue'
import { BaseCard, BaseText } from '@/components/ui'
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
  <BaseText as="h3">
    {{ webContentStore.webContent.staticEditMode.projectsTitle }}
  </BaseText>
  <BaseCard>
    <EditProjectsSectionAddNew />
    <EditProjectsSectionList :projects="projectsList" />
  </BaseCard>
</template>
